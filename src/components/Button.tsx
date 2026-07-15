import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  theme?: "primary";
  onPress?: () => void;
  disabled?: boolean;
  style?: object;
}>;

export default function Button({
  children,
  theme,
  onPress,
  disabled = false,
  style,
}: Props) {
  if (theme == "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          style,
          {
            backgroundColor: disabled ? "hsl(0, 0%, 70%)" : "#000",
          },
        ]}
      >
        <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
          <Text style={[styles.text, { color: "#fff" }]}>{children}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <View
        style={[
          styles.buttonContainer,
          style,
          {
            backgroundColor: disabled ? "hsl(0, 0%, 40%)" : "#000",
          },
        ]}
      >
        <Pressable style={styles.button} onPress={onPress} disabled={disabled}>
          <Text style={[styles.text, { color: "#fff" }]}>{children}</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingHorizontal: 8,
    flex: 1,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 16,
    width: "100%",
    paddingVertical: 12,
  },

  text: {
    color: "#fff",
    fontWeight: "medium",
    fontSize: 16,
  },
});
