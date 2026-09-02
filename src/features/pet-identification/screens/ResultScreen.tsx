import Ionicons from "@react-native-vector-icons/ionicons";
import { useQuery } from "@tanstack/react-query";
import { File } from "expo-file-system";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PetCard from "../components/PetCard";
import getIdentifiedPets from "../services/getIdentifiedPets";
import { CombinedPetMatch, IdentifyResponse, PetMatch } from "../types";

export default function ResultScreen() {
  const imageUri = useLocalSearchParams<{ data: string }>().data;
  const snnApiUrl = process.env.EXPO_PUBLIC_MODEL_BACKEND_URL;
  const [loading, setLoading] = useState<boolean>(false);
  const [topPetMatches, setTopPetMatches] = useState<PetMatch[]>([]);
  const [petIds, setPetIds] = useState<string[] | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState<Location.LocationGeocodedAddress[] | null>(null);

  useEffect(() => {
    identifyPet(imageUri);
    handleGetLocation();
  }, []);

  const { data: petMatches } = useQuery({
    queryKey: ["topPetMatches", petIds],
    queryFn: () => getIdentifiedPets(petIds ?? null),
    enabled: !!petIds?.length,
  });

  const combinedMatches = useMemo<CombinedPetMatch[]>(() => {
    if (!petMatches || !topPetMatches.length) return [];

    const matchById = new Map(topPetMatches.map((match) => [match.id, match]));

    return petMatches
      .map((pet) => {
        const match = matchById.get(pet.id);

        if (!match) return null;

        return {
          ...pet,
          distance: match.distance,
          confidence: match.confidence,
        };
      })
      .filter((pet): pet is CombinedPetMatch => pet !== null)
      .sort((a, b) => a.distance - b.distance);
  }, [petMatches, topPetMatches]);

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

      const data: IdentifyResponse = await response.json();
      if (!data.found) throw new Error("No pet found");

      // If there is pets
      const topMatches = data.top_matches ?? [];
      setTopPetMatches(topMatches);
      setPetIds(topMatches?.map((pet) => pet.id));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getIds = (petMatches: PetMatch[] | null) => {
    if (!petMatches) return;
    return petMatches.map((pet) => pet.id);
  };

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
            {combinedMatches.map((pet) => (
              <PetCard pet={pet} location={location} />
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
