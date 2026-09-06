import { Pressable, StyleProp, StyleSheet, ViewProps } from "react-native";

type Props = {
  icon: React.ReactNode;
  style?: StyleProp<ViewProps>;
  onPress?: () => void;
};

export default function CutomIconButton({ icon, style, onPress }: Props) {
  return (
    <>
      <Pressable style={[styles.main, style]} onPress={onPress}>
        {icon}
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
  },
});
