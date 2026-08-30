import Ionicons from "@react-native-vector-icons/ionicons";
import { File } from "expo-file-system";
import * as Location from "expo-location";
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
  const [long, setLong] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress[] | null>(null);

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
    handleGetLocation();
  }, []);

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permissing required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });

      setLocation(location);
      setAddress(address);
    } catch (e) {
      alert("Failed to get location");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 32 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Image source={{ uri: imageUri }} style={styles.originalPet} resizeMode="cover" />
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          <ScrollView horizontal style={{ flex: 1 }}>
            {topMatches?.map((item: topMatchesProps) => (
              <PetCard pet={item.pet} confidence={parseFloat(item.similarity)} key={item.pet.id} location={location} />
            ))}
          </ScrollView>
        )}

        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.title}>Location</Text>
          </View>

          <View>
            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Longitude:</Text>
              <Text style={styles.attribute}>{location?.coords.longitude}</Text>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Latitude:</Text>
              <Text style={styles.attribute}>{location?.coords.latitude}</Text>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Accuracy:</Text>
              <Text style={styles.attribute}>{location?.coords.accuracy}m</Text>
            </View>

            <View style={styles.attributeContainer}>
              <Text style={styles.attributeTitle}>Address:</Text>
              <Text style={styles.attribute}>{address?.[0]?.formattedAddress ?? "Unknown"}</Text>
            </View>
          </View>
        </View>
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

  attributeContainer: {
    flexDirection: "row",
    columnGap: 8,
  },

  titleContainer: {
    flexDirection: "row",
    columnGap: 8,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "semibold",
  },

  attributeTitle: {
    fontSize: 16,
    color: "hsl(0 0% 30%)",
  },

  infoContainer: {
    rowGap: 12,
    padding: 16,
    borderColor: "hsl(0 0% 32%)",
    borderTopWidth: 1,
  },

  line: {
    width: "100%",
    height: 1,
    backgroundColor: "hsl(0 0% 70%)",
    marginVertical: 8,
  },

  attribute: {
    fontSize: 16,
    color: "hsl(0 0% 10%)",
    textTransform: "capitalize",
    flexShrink: 1,
  },
});
