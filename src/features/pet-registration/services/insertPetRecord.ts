import { supabase } from "../../../../lib/supabase";
import { PetInsertRecord } from "../types";

export async function insertPetRecord(details: PetInsertRecord) {
  const { data, error } = await supabase.from("pets").insert(details).select("id").single();

  if (error) throw error;
  return data;
}
