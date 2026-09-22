import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "react-native";

interface Props {
  date: string;
  vaccine_type: string;
}

export default function VaccineCard({ date, vaccine_type }: Props) {
  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "hsl(0 0% 82%)",
          borderRadius: 4,
          gap: 12,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}>
        <View>
          <FontAwesome name="check-circle" size={40} color="green" />
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: 600, color: "green" }}>Vaccinated</Text>
          <Text style={{ fontSize: 16, color: "hsl(0 0% 32%)" }}>{`Date: ${date}`}</Text>
          <Text style={{ fontSize: 16, color: "hsl(0 0% 32%)" }}>{`Vaccine Type: ${vaccine_type}`}</Text>
        </View>
      </View>
    </>
  );
}
