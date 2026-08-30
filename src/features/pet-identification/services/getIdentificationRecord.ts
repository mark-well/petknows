import { supabase } from "../../../../lib/supabase";

export default async function getIdentificationRecord(id: string | null) {
  if (!id) throw new Error("There is no id.");

  const { data, error } = await supabase.from("identifications").select("*").eq("id", id).single();

  if (error) throw error;
  return data;
}
