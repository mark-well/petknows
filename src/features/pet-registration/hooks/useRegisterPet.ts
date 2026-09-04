import { useAuth } from "@/providers/AuthContext";
import { getEmbedding } from "@/shared/services/getImageEmbedding";
import { pickImageAsync } from "@/shared/services/imagePicker";
import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMunicipalities, getPetStatusIdFromDb, getProvinces, toVectorLiteral } from "../services";
import deletePetImage from "../services/deletePetImage";
import { insertPetImage } from "../services/insertPetImage";
import { insertPetRecord } from "../services/insertPetRecord";
import { uploadPetImage } from "../services/uploadPetImage";
import { PetImageInsertRecord, PetStatus, RegisterPetForm, SelectListType, UploadedImages } from "../types";

export function useRegisterPet() {
  const { claims } = useAuth();
  const { control, handleSubmit, reset } = useForm<RegisterPetForm>({ defaultValues: { user_id: claims?.sub } });
  const steps = 2; // How many steps there is to registration of pet
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((s) => s + 1);
  const previousStep = () => setCurrentStep((s) => s - 1);
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [provinces, setProvinces] = useState<SelectListType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [municipalAgricultureOffices, setMunicipalAgricultureOffices] = useState<SelectListType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>();
  const [registrationFailed, setRegistrationFailed] = useState<boolean>();
  const successFalse = () => setRegistrationSuccess(false);
  const failedFalse = () => setRegistrationFailed(false);
  const imageLimit = 5;

  // Fetch provinces
  useEffect(() => {
    const loadProvinces = async () => {
      const data = await getProvinces();
      setProvinces(data);
    };
    loadProvinces();
  }, []);

  // Fetch cities
  useEffect(() => {
    setMunicipalAgricultureOffices([]); //Clear the current cities array
    const loadMunicipalitites = async () => {
      if (!selectedProvince) return;
      const municipalities = await getMunicipalities(selectedProvince);
      setMunicipalAgricultureOffices(municipalities);
    };
    loadMunicipalitites();
  }, [selectedProvince]);

  // == Actions ==
  const handleImagePicker = async () => {
    const asset = await pickImageAsync(true, imageLimit - (selectedImage?.length ?? 0));
    setSelectedImage((prev) => [...prev, ...asset]);
  };

  const removeSelectedImage = (imageUri: string) => {
    setSelectedImage((prev) => prev?.filter((item) => item.uri !== imageUri));
  };

  const updateSelectedProvice = (provinceId: string) => setSelectedProvince(provinceId);

  // Upload the images to supabase and get the embedding
  const uploadPetImages = async () => {
    const folderId = Crypto.randomUUID();
    const uploadPaths: string[] = [];
    const uploads: UploadedImages[] = [];

    try {
      for (const [index, asset] of selectedImage.entries()) {
        const uploadedImage = await uploadPetImage(asset, `${folderId}/${index}`);
        uploadPaths.push(uploadedImage.path);
        console.log(`[${index}]: Uploaded - ${uploadedImage.path}`);

        const embedding = await getEmbedding(asset);
        console.log(`[${index}]: Embedding succesfully generated`);

        uploads.push({ uploadedImage, embedding });
        // return { uploadedImage, embedding };
      }
      return { folderId, uploads };

      // const uploads = await Promise.all(
      //   selectedImage.map(async (asset, index) => {
      //     // const [uploadedImage, embedding] = await Promise.all([
      //     //   uploadPetImage(asset, `${folderId}/${index}`),
      //     //   getEmbedding(asset),
      //     // ]);
      //     // return { uploadedImage, embedding };
      //     const uploadedImage = await uploadPetImage(asset, `${folderId}/${index}`);
      //     uploadPaths.push(uploadedImage.path);
      //     console.log(`[${index}]: Uploaded - ${uploadedImage.path}`);

      //     const embedding = await getEmbedding(asset);
      //     console.log(`[${index}]: Getting embedding`);

      //     return { uploadedImage, embedding };
      //   }),
      // );
    } catch (e) {
      console.error("Failed to upload pet images: ", e);
      console.log("Cleanup array:", uploadPaths);
      console.log("Cleanup count:", uploadPaths.length);

      //Clean up the images if an error occured during insert
      try {
        if (uploadPaths.length > 0) {
          const deleted = await deletePetImage(uploadPaths);
          console.log("Cleanup succeeded");
          console.log("Paths requested:", uploadPaths.length);
          console.log("Supabase deleted:", deleted?.length);
        }
      } catch (deleteError) {
        console.error("Failed to clean up pet image:", deleteError);
      }
      throw e;
    }
  };

  // Submit the form
  const submit = async (data: RegisterPetForm) => {
    if (!selectedImage) return;
    setIsSubmitting(true);

    let uploadedImagesForCleanUp: UploadedImages[] = [];
    try {
      const petStatus = await getPetStatusIdFromDb(PetStatus.registered);
      data.statusId = petStatus;

      const { folderId, uploads } = await uploadPetImages();

      if (uploads.length === 0) throw new Error("No images were uploaded.");
      data.avatarUrl = uploads[0].uploadedImage.path; //Use the first image out of 5 as the avatar
      uploadedImagesForCleanUp = uploads;

      // Insert a pet record in the database
      const pet = await insertPetRecord({
        user_id: data.user_id,
        name: data.petName,
        pet_type: data.petType,
        breed: data.breed,
        color: data.color,
        description: data.description,
        status: data.statusId,
        avatar_url: data.avatarUrl,
        embedding: null,
        place_of_registration: data.placeOfRegistrationId,
      });

      //Insert the pet images along with their embeddings
      const n: PetImageInsertRecord[] = uploads.map((image) => ({
        pet_id: pet.id,
        image_url: image.uploadedImage.path,
        embedding: toVectorLiteral(image.embedding.embedding),
        model_version: image.embedding.model_version,
        folder_id: folderId,
      }));
      await insertPetImage(n); //Inser the pet images

      setRegistrationSuccess(true);
      reset();
      setCurrentStep(1);
      setSelectedImage([]);
    } catch (error) {
      console.error(error);

      //Clean up the images if an error occured during insert
      try {
        if (uploadedImagesForCleanUp.length > 0) {
          await deletePetImage(uploadedImagesForCleanUp.map((img) => img.uploadedImage.path));
        }
      } catch (deleteError) {
        console.error("Failed to clean up pet image:", deleteError);
      }
      setRegistrationFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    steps,
    currentStep,
    nextStep,
    previousStep,
    handleImagePicker,
    selectedImage,
    removeSelectedImage,
    provinces,
    updateSelectedProvice,
    municipalAgricultureOffices,
    selectedProvince,
    control,
    submit,
    handleSubmit,

    isSubmitting,
    registrationSuccess,
    registrationFailed,
    successFalse,
    failedFalse,

    imageLimit,
  };
}
