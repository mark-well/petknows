import { Entypo } from "@react-native-vector-icons/entypo";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function TabLayout() {
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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "PetKnows",
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 16,
            marginRight: 8,
          },
          headerLeft: () => (
            <View style={styles.logo}>
              <Ionicons name="camera-outline" size={24} color="#fff" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="register"
        options={{
          title: "Register Pet",
          tabBarLabel: "Register",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="document-text-outline" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="identify"
        options={{
          title: "Identify Pet",
          tabBarLabel: "Identify",
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="magnifying-glass" size={32} color={color} />
          ),
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
});
