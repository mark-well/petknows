import { supabase } from "../../../../lib/supabase";

export async function getPetCount(userId: string | null) {
  if (!userId) return;
  const { data, error } = await supabase.rpc("get_species_counts", {
    uid: userId,
  });

  if (error) throw error;
  return data;
}
