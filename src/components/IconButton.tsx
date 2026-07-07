import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: React.ReactElement;
  title: string;
  subTitle: string;
  theme?: "primary";
  onPress: () => void;
};

export default function IconButton({
  icon,
  title,
  subTitle,
  theme,
  onPress,
}: Props) {
  if (theme == "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: "#000", borderWidth: 0 },
        ]}
      >
        <Pressable style={styles.button} onPress={onPress}>
          <View
            style={[styles.iconContainer, { backgroundColor: "hsl(0,0%,20%)" }]}
          >
            {icon}
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: "#fff" }]}>{title}</Text>
            <Text style={[styles.subTitle, { color: "hsl(0,0%,80%)" }]}>
              {subTitle}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.iconContainer}>{icon}</View>

        <View style={styles.textContainer}>
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
    borderColor: "#ccc",
    borderRadius: 12,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
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
