import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constants/colors";

export default function Input({ label, error, ...inputProps }) {

  const inputStyles = [styles.input];
  if (inputProps?.multiline) {
    inputStyles.push(styles.multilineInput);
  }

  if (error) {
    inputStyles.push(styles.inputError);
  }
  
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...inputProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    color: colors.LIGHT,
    fontWeight: "600",
    fontSize: 18,
  },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 12,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 6,
  },
  inputError: {
    borderColor: "red",
    borderWidth: 3
  }
});