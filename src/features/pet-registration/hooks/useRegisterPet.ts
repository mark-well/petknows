import { pickImageAsync } from "@/shared/services/imagePicker";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMunicipalities, getProvinces } from "../services";
import { RegisterPetForm, SelectListType } from "../types";

export function useRegisterPet() {
  const { control, watch, handleSubmit } = useForm<RegisterPetForm>();
  const [step, setStep] = useState(1);
  const nextStep = () => setStep((s) => s + 1);
  const previousStep = () => setStep((s) => s - 1);
  const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [provinces, setProvinces] = useState<SelectListType[]>([]);
  const [municipalAgricultureOffices, setMunicipalAgricultureOffices] = useState<SelectListType[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>();

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

  return {
    step,
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
    watch,
    handleSubmit,
  };
}
