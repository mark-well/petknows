import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../../lib/supabase";

export const uploadPetImage = async (file: ImagePicker.ImagePickerAsset, fileName: string) => {
  if (!file.base64) throw new Error("The image does not contain a base64");

  const base64 = file.base64;
  const contentType = file.mimeType || "image/jpeg";

  const { data, error } = await supabase.storage.from("pet_avatars").upload(`${fileName}`, decode(base64), {
    contentType: contentType,
  });

  if (error) throw error;
  return data;
};
