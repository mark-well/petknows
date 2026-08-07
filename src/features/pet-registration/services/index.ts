import { supabase } from "../../../../lib/supabase";
import { PetStatus, SelectListType } from "../types";

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

export const getPetStatusIdFromDb = async (statusName: PetStatus) => {
  const { data, error } = await supabase
    .from("pet_status")
    .select("id, name")
    .eq("name", statusName)
    .single();

  if (error) throw error;
  return data.id;
};

export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}
