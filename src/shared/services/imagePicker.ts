import * as ImagePicker from "expo-image-picker";

export const pickImageAsync = async (_base64: boolean = false) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
    base64: _base64,
  });

  if (result.canceled) return null;
  return result.assets[0];
};
