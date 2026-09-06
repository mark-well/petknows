import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../../lib/supabase";

export default async function uploadUserProfilePicture(image: ImagePicker.ImagePickerAsset, userId: string) {
  if (!image.base64) throw new Error("The image does not contain a base64");
  const base64 = image.base64;
  const contentType = image.mimeType || "image/jpeg";
  const fileName = userId;

  const { data, error } = await supabase.storage.from("user_avatars").upload(fileName, decode(base64), {
    contentType: contentType,
  });

  if (error) throw error;
  return data;
}
