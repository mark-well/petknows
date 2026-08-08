import { useAuth } from "@/providers/AuthContext";
import { pickImageAsync } from "@/shared/services/imagePicker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMunicipalities, getPetStatusIdFromDb, getProvinces } from "../services";
import { PetStatus, RegisterPetForm, SelectListType } from "../types";

export function useRegisterPet() {
  const { claims } = useAuth();
  const { control, handleSubmit } = useForm<RegisterPetForm>({ defaultValues: { ownerId: claims?.sub } });
  const steps = 2; // How many steps there is to registration of pet
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((s) => s + 1);
  const previousStep = () => setCurrentStep((s) => s - 1);
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [provinces, setProvinces] = useState<SelectListType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [municipalAgricultureOffices, setMunicipalAgricultureOffices] = useState<SelectListType[]>([]);

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

    const petStatus = await getPetStatusIdFromDb(PetStatus.registered);
    // const avatar = await uploadPetAvatar(selectedImage);
    // const embedding = await getEmbedding(selectedImage);
    data.statusId = petStatus;
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
  };
}
