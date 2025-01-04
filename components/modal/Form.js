import { Feather } from "@expo/vector-icons";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import Input from "./Input";

export default function Form({ isFormVisible, closeForm }) {
  const closeKeyboardHandler = () => Keyboard.dismiss();
  return (
    <Modal
      visible={isFormVisible}
      presentationStyle="formSheet"
      animationType="slide"
    >
      <Pressable style={styles.formContainer} onPress={closeKeyboardHandler}>
        <View style={styles.headerContainer}>
          <Text style={styles.formTitle}>Nouvel événement</Text>
          <Feather
            name="trash-2"
            size={28}
            color={colors.LIGHT}
            onPress={closeForm}
            suppressHighlighting={true}
          />
        </View>
        <Input label="Titre" autoCorrect={false} maxLength={40} />
        <Input label="Lieu" autoCorrect={false} maxLength={40} />
        <Input label="Téléphone" inputMode="tel" maxLength={10} />
        <Input label="Description" maxLength={120} />
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.DARK,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
});