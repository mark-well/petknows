import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../../lib/supabase";
import deleteImage from "../services/deleteImage";

export default async function updateUserProfilePicture(
  userId: string,
  image: ImagePicker.ImagePickerAsset,
  oldProfilePath?: string | null,
) {
  if (!image.base64) throw new Error("The image does not contain a base64");
  if (!userId) throw new Error("No userId specified");

  const base64 = image.base64;
  const contentType = image.mimeType || "image/jpeg";
  const fileName = `${userId}-${new Date().toISOString().replace(/[:.]/g, "-")}`;

  // Upload the new profile
  const { data: newProfile, error: uploadedError } = await supabase.storage
    .from("user_avatars")
    .upload(fileName, decode(base64), {
      contentType: contentType,
    });
  if (uploadedError) throw uploadedError;

  // Update the url
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: newProfile.path })
    .eq("id", userId);

  // Clean the newProfile if updating the url fail
  if (updateError) {
    await supabase.storage
      .from("user_avatars")
      .remove([newProfile.path])
      .catch(() => {});
    throw updateError;
  }

  // Delete old profile if upload succeeds
  if (oldProfilePath) {
    await deleteImage("user_avatars", [oldProfilePath]).catch((error) =>
      console.warn("Failed to delete old avatar:", error),
    );
  }

  return newProfile;
}
