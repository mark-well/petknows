import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { EmbeddingResponse } from "../types";

export async function getEmbedding(image: ImagePicker.ImagePickerAsset) {
  const snnApiUrl = process.env.EXPO_PUBLIC_MODEL_BACKEND_URL;
  const file = new File(image.uri);
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${snnApiUrl}/get_embedding`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to get embedding (${response.status})`);
  }

  const data: EmbeddingResponse = await response.json();
  return data;
}
