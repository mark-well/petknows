import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { markNotifAsRead } from "../services";
import { Notification } from "../types";

type Props = {
  notif: Notification;
};

export default function NotificationItem({ notif }: Props) {
  const markAsReadMutation = useMutation({
    mutationFn: (notifId: string) => markNotifAsRead(notifId),
  });

  const navigateToDetailsPage = (_id: string) => {
    router.push({
      pathname: "/notification/[id]",
      params: {
        id: _id,
      },
    });

    markAsReadMutation.mutate(notif.id);
  };

  return (
    <>
      <Pressable onPress={() => navigateToDetailsPage(notif.id)}>
        <View style={styles.main}>
          <Text style={[notif.is_read ? "" : styles.bold, { fontSize: 16 }]}>{notif.title}</Text>
          <Text style={{ color: "hsl(0 0% 32%)", fontSize: 14 }}>{notif.type}</Text>
          <Text style={styles.message} ellipsizeMode="tail" numberOfLines={1}>
            {notif.message}
          </Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    minHeight: 32,
    padding: 16,
  },

  bold: {
    fontWeight: 700,
  },

  message: {
    color: "hsl(0 0% 48%)",
    marginTop: 8,
  },
});
