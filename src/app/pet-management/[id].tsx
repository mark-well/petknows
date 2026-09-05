import PetDetailsScreen from "@/features/pet-management/screens/PetDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function PetDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <PetDetailsScreen petId={id} />;
}
