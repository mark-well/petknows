import { supabase } from "../../../../lib/supabase";

export default async function getIdentifiedPets(petIds: string[] | null) {
  if (!petIds) throw new Error("No pet ids provided");
  const { data, error } = await supabase
    .from("pets")
    .select(
      `id,
      public_id,
      name,
      pet_type,
      breed,
      color,
      status:pet_status(name),
      created_at,
      avatar_url,
      registered_at:place_of_registration(name),
      owner:profiles(
        id,
        public_id,
        first_name,
        last_name,
        sex,
        email,
        contacts:user_contact(number),
        province:address_province(name),
        city:address_city(name),
        barangay:address_barangay(name)
      )`,
    )
    .in("id", petIds);

  if (error) throw error;
  return data;
}
