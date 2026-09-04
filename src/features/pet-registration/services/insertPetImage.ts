import { supabase } from "../../../../lib/supabase";
import { PetImageInsertRecord } from "../types";

export async function insertPetImage(details: PetImageInsertRecord[]) {
  const { data, error } = await supabase.from("pet_images").insert(details);

  if (error) throw error;
  return data;
}
