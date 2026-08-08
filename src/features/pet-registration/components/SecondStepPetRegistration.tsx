import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PetRegistrationStepProp } from "../types";

export default function SecondStepPetRegistration({ registerPet }: PetRegistrationStepProp) {
  return (
    <View style={{ display: "flex", flex: 1 }}>
      <View style={{ rowGap: 4 }}>
        <Text style={{ fontSize: 24, fontWeight: "medium" }}>Pet Photo</Text>
        <Text style={{ color: "hsl(0, 0%, 30%)" }}>Upload an image of your pet</Text>
      </View>

      {registerPet.selectedImage ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
            }}
          >
            <View
              style={{
                zIndex: 2,
                position: "absolute",
                padding: 8,
                backgroundColor: "hsl(0 100% 60%)",
                borderRadius: "50%",
                right: -10,
                top: -10,
              }}
            >
              <Pressable onPress={registerPet.removeSelectedImage}>
                <Ionicons name="close" size={24} color="hsl(0 0% 100%)" />
              </Pressable>
            </View>
            <Image
              style={{
                aspectRatio: "1/1",
                borderRadius: 16,
              }}
              source={registerPet.selectedImage.uri}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={styles.uploadButtonContainer}>
            <Pressable onPress={registerPet.handleImagePicker}>
              <Lucide name="upload" size={64} color="hsl(0, 0%, 60%)" />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadButtonContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "hsl(0, 0%, 60%)",
    padding: 32,
    borderRadius: 8,
  },
});
