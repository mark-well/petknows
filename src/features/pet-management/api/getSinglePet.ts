import { supabase } from "../../../../lib/supabase";

export default async function getSinglePet(petId: string) {
  const { data, error } = await supabase
    .from("pets")
    .select(
      `
      id,
      public_id,
      name,
      pet_type,
      status,
      created_at,
      mao:place_of_registration(name),
      avatar_url,
      breed,
      color,
      description
    `,
    )
    .eq("id", petId)
    .single();

  if (error) throw error;
  return {
    ...data,
    publicAvatarUrl: data.avatar_url
      ? supabase.storage.from("pet_avatars").getPublicUrl(data.avatar_url).data.publicUrl
      : null,
  };
}
