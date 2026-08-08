import { supabase } from "../../../../lib/supabase";

export default async function deletePetImage(url: string) {
  if (!url) return;

  const { error } = await supabase.storage.from("pet_avatars").remove([url]);
  if (error) throw error;
}
