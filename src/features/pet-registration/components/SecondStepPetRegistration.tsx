import Ionicons from "@react-native-vector-icons/ionicons";
import Lucide from "@react-native-vector-icons/lucide";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { PetRegistrationStepProp } from "../types";

export default function SecondStepPetRegistration({ registerPet }: PetRegistrationStepProp) {
  return (
    <View style={{ display: "flex", flex: 1, gap: 32 }}>
      <View style={{ rowGap: 4 }}>
        <Text style={{ fontSize: 24, fontWeight: "medium" }}>Pet Photo</Text>
        <Text style={{ color: "hsl(0, 0%, 30%)", fontWeight: 600, fontSize: 16 }}>
          Upload five(5) images of your pet.
        </Text>
        <Text style={{ color: "hsl(0, 0%, 30%)", fontSize: 14 }}>
          <Text style={{ fontWeight: 700 }}>Note</Text>: Make sure you upload images of a single pet and not different
          ones.
        </Text>
      </View>

      {registerPet.selectedImage.length !== 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 16,
          }}>
          {registerPet.selectedImage.map((asset) => (
            <View
              key={asset.uri}
              style={{
                width: "30%",
                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                borderRadius: 16,
              }}>
              <View
                style={{
                  zIndex: 2,
                  position: "absolute",
                  padding: 6,
                  backgroundColor: "hsl(0 100% 60%)",
                  borderRadius: "50%",
                  right: -10,
                  top: -10,
                }}>
                <Pressable onPress={() => registerPet.removeSelectedImage(asset.uri)}>
                  <Ionicons name="close" size={20} color="hsl(0 0% 100%)" />
                </Pressable>
              </View>
              <Image
                style={{
                  aspectRatio: "1/1",
                  borderRadius: 16,
                }}
                source={asset.uri}
              />
            </View>
          ))}

          {registerPet.selectedImage.length < registerPet.imageLimit && (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "30%",
                aspectRatio: "1/1",
              }}>
              <View style={styles.uploadButtonContainer}>
                <Pressable onPress={registerPet.handleImagePicker}>
                  <Lucide name="upload" size={36} color="hsl(0, 0%, 60%)" />
                </Pressable>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}>
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
