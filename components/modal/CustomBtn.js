import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomBtn = ({ text, onPress, color }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.btn, { backgroundColor: color }]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    width: 140,
    height: 60,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontWeight: "800",
    fontSize: 24,
  },
});