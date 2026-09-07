import { useAuth } from "@/providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { RefreshControl, ScrollView, Text } from "react-native";
import getUserPets from "../api/getUserPets";
import PetItem from "../components/PetItem";

export default function PetManagementScreen() {
  const { userProfile } = useAuth();

  const {
    data: pets,
    isPending: pageRefreshing,
    refetch,
  } = useQuery({
    queryKey: ["userPets", userProfile?.id],
    queryFn: () => getUserPets(userProfile?.id!),
    enabled: Boolean(userProfile?.id),
  });

  // Refresh the page everytime it gets focused
  useFocusEffect(() => {
    refetch();
  });

  const onRefresh = () => {
    refetch();
  };

  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: 26,
          paddingVertical: 8,
          textTransform: "uppercase",
          color: "hsl(19 100% 61%)",
          borderBottomWidth: 1,
          borderBottomColor: "hsl(19 100% 82%)",
        }}>
        Your Pets
      </Text>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 8, padding: 8, minHeight: "100%" }}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}>
        {pets?.map((pet) => (
          <PetItem
            key={pet.id}
            petId={pet.id}
            petName={pet.name || "Name"}
            petSpecies={pet.pet_type || "Species"}
            petStatus={pet.status || "Status"}
            avatarUrl={pet.avatarUrl || null}
          />
        ))}
      </ScrollView>
    </>
  );
}
