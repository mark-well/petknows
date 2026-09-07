import { supabase } from "../../../../lib/supabase";
import { AddressFormType } from "../types";

export default async function updateUserAddress(userId: string, updatedAddress: AddressFormType) {
  const { error } = await supabase
    .from("profiles")
    .update({
      province_id: updatedAddress.provinceId,
      city_id: updatedAddress.cityId,
      barangay_id: updatedAddress.barangayId,
    })
    .eq("id", userId);

  if (error) throw error;
}
