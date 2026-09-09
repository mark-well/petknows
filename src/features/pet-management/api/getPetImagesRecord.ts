import { supabase } from "../../../../lib/supabase";

export default async function getPetImagesRecord(petIds: string[]) {
  const { data, error } = await supabase.from("pet_images").select("*").in("pet_id", petIds);

  if (error) throw error;
  return data;
}
