import { useAuth } from "@/providers/AuthContext";
import { getEmbedding } from "@/shared/services/getImageEmbedding";
import { pickImageAsync } from "@/shared/services/imagePicker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMunicipalities, getPetStatusIdFromDb, getProvinces, toVectorLiteral } from "../services";
import deletePetImage from "../services/deletePetImage";
import { insertPetRecord } from "../services/insertPetRecord";
import { uploadPetAvatar } from "../services/uploadPetAvatar";
import { PetStatus, RegisterPetForm, SelectListType } from "../types";

export function useRegisterPet() {
  const { claims } = useAuth();
  const { control, handleSubmit, reset } = useForm<RegisterPetForm>({ defaultValues: { ownerId: claims?.sub } });
  const steps = 2; // How many steps there is to registration of pet
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((s) => s + 1);
  const previousStep = () => setCurrentStep((s) => s - 1);
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [provinces, setProvinces] = useState<SelectListType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [municipalAgricultureOffices, setMunicipalAgricultureOffices] = useState<SelectListType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>();
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>();
  const [registrationFailed, setRegistrationFailed] = useState<boolean>();
  const successFalse = () => setRegistrationSuccess(false);
  const failedFalse = () => setRegistrationFailed(false);

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
    const asset = await pickImageAsync(true);
    setSelectedImage(asset);
  };

  const removeSelectedImage = () => setSelectedImage(() => null);
  const updateSelectedProvice = (provinceId: string) => setSelectedProvince(provinceId);

  // Submit the form
  const submit = async (data: RegisterPetForm) => {
    if (!selectedImage) return;
    setIsSubmitting(true);

    try {
      const petStatus = await getPetStatusIdFromDb(PetStatus.registered);
      data.statusId = petStatus;

      const avatar = await uploadPetAvatar(selectedImage);
      data.avatarUrl = avatar.path;

      const embedding = await getEmbedding(selectedImage);
      data.embedding = toVectorLiteral(embedding);

      await insertPetRecord({
        owner: data.ownerId,
        name: data.petName,
        pet_type: data.petType,
        status: data.statusId,
        avatar_url: data.avatarUrl,
        embedding: data.embedding,
        place_of_registration: data.placeOfRegistrationId,
      });

      setRegistrationSuccess(true);
      reset();
      setCurrentStep(1);
      setSelectedImage(null);
    } catch (e) {
      console.log(e);
      try {
        await deletePetImage(data.avatarUrl);
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
  };
}
