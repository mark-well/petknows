import { useMutation } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import uploadUserProfilePicture from "../api/updateUserProfilePicture";

export default function useUpateProfilePicture() {
  return useMutation({
    mutationFn: ({
      image,
      userId,
      oldProfilePath,
    }: {
      image: ImagePicker.ImagePickerAsset;
      userId: string;
      oldProfilePath: string | null;
    }) => uploadUserProfilePicture(userId, image, oldProfilePath),
  });
}
