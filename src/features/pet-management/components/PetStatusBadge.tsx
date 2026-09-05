import { Database } from "@/shared/types/database.types";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type PetStatus = Database["public"]["Enums"]["pet_status"];
const statusConfig = {
  registered: {
    label: "Registered",
    backgroundColor: "hsl(133 66% 82%)",
    color: "hsl(133 66% 32%)",
  },

  missing: {
    label: "Missing",
    backgroundColor: "hsl(0 89% 82%)",
    color: "hsl(0 89% 32%)",
  },
};

type Props = {
  status: PetStatus;
  style?: StyleProp<ViewStyle>;
};

export default function PetStatusBadge({ style, status }: Props) {
  const config = statusConfig[status];

  return (
    <>
      <View style={[styles.container, style, { backgroundColor: config.backgroundColor }]}>
        <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "hsl(133 66% 82%)",
    color: "hsl(133 66% 32%)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
  },
});
