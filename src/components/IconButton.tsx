import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ReactElement;
  title: string;
  subTitle: string;
  theme?: "primary";
  onPress: () => void;
};

export default function IconButton({ icon, title, subTitle, theme, onPress }: Props) {
  if (theme == "primary") {
    return (
      <View style={[styles.buttonContainer, { backgroundColor: "hsl(0 88% 30%)", borderWidth: 0 }]}>
        <Pressable style={[styles.button, { borderRadius: 12 }]} onPress={onPress}>
          <View style={[styles.iconContainer, { backgroundColor: "hsl(0 88% 26%)" }]}>{icon}</View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "hsl(0 88% 98%)" }]}>{title}</Text>
            <Text style={[styles.subTitle, { color: "hsl(0 88% 92%)" }]}>{subTitle}</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, { backgroundColor: "hsl(0 88% 96%)", borderRadius: 12 }]} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: "hsl(0 88% 90%)" }]}>{icon}</View>

        <View style={[styles.textContainer]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderWidth: 1,
    borderColor: "hsl(0 88% 82%)",
    borderRadius: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 22,
    paddingVertical: 12,
    columnGap: 16,
    width: "100%",
  },

  iconContainer: {
    backgroundColor: "#ddd",
    padding: 16,
    borderRadius: "50%",
  },

  textContainer: {
    rowGap: 2,
  },

  title: {
    fontWeight: 500,
    fontSize: 16,
  },

  subTitle: {
    fontSize: 14,
    color: "hsl(0, 0%, 30%)",
  },
});
