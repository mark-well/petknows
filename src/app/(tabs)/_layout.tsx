import { getUserNotificationsCount } from "@/features/notification/services";
import { useAuth } from "@/providers/AuthContext";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const { userProfile } = useAuth();

  const { data: notificationCount } = useQuery({
    queryKey: ["unreadNotification"],
    queryFn: () => getUserNotificationsCount(userProfile?.id ?? null),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          borderBottomColor: "#cccccc",
          borderBottomWidth: 1,
        },
        tabBarActiveTintColor: "#000",
        tabBarStyle: {
          height: 110,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "PetKnows",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          headerLeftContainerStyle: {
            paddingLeft: 16,
            marginRight: 8,
          },
          headerRightContainerStyle: {
            paddingRight: 16,
          },
          headerLeft: () => (
            <View style={styles.logo}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </View>
          ),
          headerRight: () => (
            <Pressable>
              <Ionicons name="notifications" size={24} color="#000" />
              {(notificationCount ?? 0) > 0 && (
                <View style={styles.notifBadgeContainer}>
                  <Text style={styles.notifBadgeNumber}>
                    {(notificationCount ?? 0) > 99 ? "99+" : notificationCount}
                  </Text>
                </View>
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register Pet",
          tabBarLabel: "Register",
          tabBarIcon: ({ color }) => <Ionicons name="document-text-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="identify"
        options={{
          title: "Identify Pet",
          tabBarLabel: "Identify",
          tabBarIcon: ({ color }) => <Entypo name="magnifying-glass" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "App Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#000",
    borderRadius: 50,
  },

  notifBadgeContainer: {
    position: "absolute",
    top: -5,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  notifBadgeNumber: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
