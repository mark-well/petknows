import * as Location from "expo-location";
import { supabase } from "../../../../lib/supabase";

export default async function insertIdentificationRecord(
  petId: string,
  userId: string | null,
  location: Location.LocationObject | null,
) {
  if (!userId) throw new Error("No valid id to insert a identifications record.");

  const { data, error } = await supabase
    .from("identifications")
    .insert({
      pet: petId,
      user_id: userId,
      longitude: location?.coords.longitude,
      latitude: location?.coords.latitude,
      location_accuracy: location?.coords.accuracy,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}
