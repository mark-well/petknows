import { supabase } from "../../../../lib/supabase";
import { SelectListType } from "../types";

// Get all provinces in the database
export async function getProvinces() {
  const { data, error } = await supabase
    .from("address_province")
    .select("key:id, value:name")
    .overrideTypes<SelectListType[]>();

  if (error) return [];
  return data;
}

//Get all thte municipalities of a province using province id
export async function getMunicipalities(provinceId: string) {
  const { data, error } = await supabase
    .from("mao")
    .select("key:id, value:name, addresses (province_id)")
    .eq("addresses.province_id", provinceId)
    .overrideTypes<SelectListType[]>();

  if (error) return [];
  return data;
}
