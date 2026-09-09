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

//Get all the  mao of a province using province id
export async function getMunicipalities(provinceId: string) {
  const { data, error } = await supabase
    .from("mao")
    .select("key:id, value:office_name")
    .eq("province_id", provinceId)
    .overrideTypes<SelectListType[]>();

  if (error) return [];
  return data;
}

export function toVectorLiteral(embedding: number[]): string {
  return `[${embedding.join(",")}]`;
}
