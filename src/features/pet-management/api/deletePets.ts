import { supabase } from "../../../../lib/supabase";
import deletePetImageService from "./deletePetImageService";
import getPetImagesRecord from "./getPetImagesRecord";

export default async function deletePets(petIds: Set<string>) {
  if (petIds.size === 0) throw new Error("No pets to delete");

  const petIdsArr = [...petIds];
  const petImagesRecord = await getPetImagesRecord(petIdsArr);
  const imageUrls = petImagesRecord.map((record) => record.image_url).filter((url): url is string => url !== null);

  // Delete the pet
  const { error } = await supabase.from("pets").delete().in("id", petIdsArr);
  if (error) throw error;

  // Delete the pet images
  if (imageUrls.length > 0) {
    await deletePetImageService(imageUrls);
  }

  console.log("Pet successfully deleted: ", petIds);
}
