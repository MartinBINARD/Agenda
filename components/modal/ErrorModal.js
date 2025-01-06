import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import CustomBtn from "./CustomBtn";

export default function ErrorModal({ isModalVisible, closeModal, errors}) {
  return (
    <Modal visible={isModalVisible} animation="slide" transparent>
      <View style={styles.container}>
        {errors.map((error, i) => (
          <Text key={i} style={styles.text}> &#8226;  {error}</Text>
        ))}
      </View>
      <View style={styles.btnContainer}>
        <CustomBtn color={colors.VIOLET} text="OK" onPress={closeModal} />
      </View>
    </Modal>
  );
}

const styles= StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    minHeight: Dimensions.get("screen").height / 3,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24
  },
  text: {
    fontSize: 18,
    marginTop: 8,
    marginLeft: 8
  },
  btnContainer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: "center"
  }
})