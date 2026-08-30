import NotificationDetailsScreen from "@/features/notification/screens/NotificationDetailsScreen";
import { useLocalSearchParams } from "expo-router";

export default function NotificationDetailsRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <NotificationDetailsScreen id={id} />;
}
