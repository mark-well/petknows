import * as ImagePicker from "expo-image-picker";

export const pickImageAsync = async (_base64: boolean = false, imageLimit: number = 1) => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: imageLimit > 1 ? false : true,
    quality: 1,
    base64: _base64,
    allowsMultipleSelection: imageLimit > 1 ? true : false,
    selectionLimit: imageLimit,
  });

  if (result.canceled) return [];
  return result.assets;
};
