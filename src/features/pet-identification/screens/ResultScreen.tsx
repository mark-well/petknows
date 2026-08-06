import { File } from "expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PetCard from "../components/PetCard";

type topMatchesProps = {
  pet: any;
  similarity: string;
};

export default function ResultScreen() {
  const imageUri = useLocalSearchParams<{ data: string }>().data;
  const snnApiUrl = process.env.EXPO_PUBLIC_MODEL_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [topMatches, setTopMatches] = useState<[]>();

  useEffect(() => {
    const identifyPet = async (imageUri: string) => {
      try {
        setLoading(true);
        const image = new File(imageUri);
        const formData = new FormData();
        formData.append("file", image);

        const response = await fetch(`${snnApiUrl}/identify`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!data.found) throw data.error;

        // If there is pets
        setTopMatches(data["top_matches"]);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    identifyPet(imageUri);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 32 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Image
            source={{ uri: imageUri }}
            style={styles.originalPet}
            resizeMode="cover"
          />
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <ScrollView horizontal style={{ flex: 1 }}>
            {topMatches?.map((item: topMatchesProps) => (
              <PetCard
                pet={item.pet}
                confidence={parseFloat(item.similarity)}
                key={item.pet.id}
              />
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  originalPet: {
    flex: 1,
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
  },
});
