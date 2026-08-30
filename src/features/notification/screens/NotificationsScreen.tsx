import { useAuth } from "@/providers/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native";
import NotificationItem from "../components/NotificationItem";
import { getUserNotifications } from "../services";

export default function NotificationScreen() {
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const [pageRefreshing, setPageRefreshing] = useState<boolean>(false);

  const { data: notifications = [], isPending: notifLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getUserNotifications(userProfile?.id ?? null),
    enabled: !!userProfile?.id,
  });

  const onRefresh = async () => {
    setPageRefreshing(true);
    try {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    } finally {
      setPageRefreshing(false);
    }
  };

  return (
    <>
      <ScrollView
        style={styles.main}
        refreshControl={<RefreshControl refreshing={pageRefreshing} onRefresh={onRefresh} />}>
        {notifLoading ? (
          <View>
            <Text>Loading....</Text>
          </View>
        ) : (
          notifications?.map((notif) => <NotificationItem key={notif.id} notif={notif} />)
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});
