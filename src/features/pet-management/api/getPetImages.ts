import { supabase } from "../../../../lib/supabase";

export default async function getPetImages(petId: string) {
  const { data, error } = await supabase.from("pet_images").select("image_url").eq("pet_id", petId);

  if (error) throw error;
  return data.map((image) => ({
    ...image,
    publicUrl: image.image_url
      ? supabase.storage.from("pet_avatars").getPublicUrl(image.image_url).data.publicUrl
      : null,
  }));
}
