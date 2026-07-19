import IconButton from "@/components/IconButton";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Lucide } from "@react-native-vector-icons/lucide";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Identify() {
  //Open the image picker
  const pickImageAsync = async () => {
    let result = ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>
          Choose Identification Method
        </Text>
        <Text style={{ fontSize: 14, color: "hsl(0, 0%, 30%)" }}>
          Select how you want to identify the pet
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          icon={<Lucide name="upload" size={24} color="#000" />}
          title="Upload Photo"
          subTitle="Select an image from your device"
          onPress={() => alert("Not implemented yer")}
        />
        <IconButton
          icon={<Ionicons name="camera-outline" size={24} color="#fff" />}
          title="Live Camera"
          subTitle="Use your camera to scan the pet"
          theme="primary"
          onPress={() => router.push("/live-camera")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    rowGap: 32,
  },

  headContainer: {
    alignItems: "center",
    rowGap: 4,
  },

  buttonContainer: {
    rowGap: 16,
  },
});
