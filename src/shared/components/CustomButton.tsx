import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
};

export default function CustomButton({ children, onPress, style, disabled = false }: Props) {
  return (
    <>
      <Pressable onPress={onPress} disabled={disabled}>
        <View style={[styles.mainContainer, style, disabled && styles.disabled]}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "hsl(0 88% 30%)",
    borderRadius: 6,
  },

  disabled: {
    backgroundColor: "hsl(0 0% 64%)",
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },
});
