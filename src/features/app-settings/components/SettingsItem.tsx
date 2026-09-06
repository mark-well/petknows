import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  text: string;
  onPress?: () => void;
};

export default function SettingsItem({ icon, text, onPress }: Props) {
  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => [pressed && styles.pressedState]}>
        <View style={styles.main}>
          <View style={styles.info}>
            <View style={styles.iconContainer}>
              <FontAwesome name={icon} size={20} color="black" />
            </View>
            <Text style={styles.text}>{text}</Text>
          </View>
          <FontAwesome name="angle-right" size={24} color="black" />
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  info: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },

  iconContainer: {
    width: 20,
    aspectRatio: "1/1",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontWeight: "500",
    fontSize: 14,
  },

  pressedState: {
    backgroundColor: "hsl(0 0% 82%)",
  },
});
