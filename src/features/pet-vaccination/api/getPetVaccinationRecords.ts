import { supabase } from "../../../../lib/supabase";

export default async function getPetVaccinationRecords(petId: string) {
  const { data, error } = await supabase
    .from("vaccination")
    .select(`id, created_at, vaccination_date, type`)
    .eq("pet_id", petId);

  if (error) throw error;
  return data;
}
