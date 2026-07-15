import {
  ReturnKeyTypeOptions,
  StyleSheet,
  TextInput,
  TextInputKeyPressEvent,
} from "react-native";

type Props = {
  style?: Object;
  placeholder?: string;
  value?: string;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  onkeyPress?: (key: TextInputKeyPressEvent) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  readOnly?: boolean;
};

export default function InputText(props: Props) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor || "hsl(0 0% 60%)"}
      secureTextEntry={props.secureTextEntry}
      onChangeText={props.onChangeText}
      value={props.value}
      onKeyPress={(key) => props.onkeyPress?.(key)}
      returnKeyType={props.returnKeyType}
      readOnly={props.readOnly}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    lineHeight: 16 * 1.3,
    borderWidth: 1,
    borderColor: "hsl(0 0% 80%)",
    backgroundColor: "hsl(0, 0% 90%)",
    borderRadius: 8,
    paddingHorizontal: 16,
    color: "hsl(0 0% 0%)",
  },
});
