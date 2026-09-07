import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getBarangay from "../api/getBarangay";
import getCities from "../api/getCities";
import getProvinces from "../api/getProvinces";

export default function useAddresses() {
  const [selectedProvince, setSelectedProvince] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedBarangay, setSelectedBarangay] = useState<string>();

  const { data: provinces } = useQuery({
    queryKey: ["getProvince"],
    queryFn: getProvinces,
  });

  const { data: cities } = useQuery({
    queryKey: ["getCities", selectedProvince],
    queryFn: () => getCities(selectedProvince!),
    enabled: Boolean(selectedProvince),
  });

  const { data: barangay } = useQuery({
    queryKey: ["getBarangay", selectedCity],
    queryFn: () => getBarangay(selectedCity!),
    enabled: Boolean(selectedCity),
  });

  return {
    provinces,
    cities,
    barangay,
    setSelectedProvince,
    setSelectedCity,
    setSelectedBarangay,
    selectedProvince,
    selectedCity,
  };
}
