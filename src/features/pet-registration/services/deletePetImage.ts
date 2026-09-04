import { supabase } from "../../../../lib/supabase";

export default async function deletePetImage(urls: string[]) {
  if (!urls) return;

  const { data, error } = await supabase.storage.from("pet_avatars").remove(urls);
  if (error) throw error;
  return data;
}
