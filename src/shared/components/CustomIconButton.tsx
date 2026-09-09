import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  children?: React.ReactNode;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function CutomIconButton({ icon, style, onPress, children }: Props) {
  return (
    <>
      <Pressable style={[styles.main, style]} onPress={onPress}>
        {icon}
        {children && <Text>{children}</Text>}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 4,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    flexDirection: "row",
  },
});
