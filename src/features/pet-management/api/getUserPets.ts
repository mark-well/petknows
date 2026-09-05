import { supabase } from "../../../../lib/supabase";

export default async function getUserPets(userId: string) {
  const { data, error } = await supabase
    .from("pets")
    .select(`id, name, status, pet_type, avatar_url`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map((pet) => ({
    ...pet,
    avatarUrl: pet.avatar_url ? supabase.storage.from("pet_avatars").getPublicUrl(pet.avatar_url).data.publicUrl : null,
  }));
}
