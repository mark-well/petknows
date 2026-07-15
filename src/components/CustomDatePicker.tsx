import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import DatePicker from "react-native-date-picker";
import InputText from "./InputText";

type Props = {
  style?: Object;
  onConfirm?: (date: Date) => void;
};

export default function CustomDatePicker(props: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [formattedDate, setFormattedDate] = useState<string>();

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const onConfirmDate = (date: Date) => {
    setDate(date);
    setOpen(false);
    setFormattedDate(formatDate(date));
    props.onConfirm?.(date);
  };

  return (
    <View style={[styles.container, props.style]}>
      <InputText
        style={styles.input}
        placeholder="MM/DD/YYYY"
        value={formattedDate}
        onChangeText={(text: string) => setFormattedDate(text)}
        onkeyPress={(key) => console.log(key.currentTarget)}
        readOnly={true}
      />
      <Pressable style={styles.pressable} onPress={() => setOpen(true)}>
        <Ionicons
          style={styles.icon}
          name="calendar"
          size={24}
          color="hsl(0 0% 30%)"
        />
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date: Date) => onConfirmDate(date)}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 2,
    height: "100%",
    width: "100%",
  },

  pressable: {
    position: "absolute",
    right: 16,
  },

  icon: {
    flex: 1,
  },
});
