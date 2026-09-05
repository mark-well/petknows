import { supabase } from "../../../../lib/supabase";
import { PetUpdateRecord } from "../types";

export default async function updatePet(petId: string, petDetails: PetUpdateRecord) {
  const { error } = await supabase.from("pets").update(petDetails).eq("id", petId);

  if (error) throw error;
}
