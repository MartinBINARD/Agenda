import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import CustomBtn from "./CustomBtn";
import DateTimePicker from "./DateTimePicker";
import Input from "./Input";
import IsOnline from "./IsOnline";

export default function Form({ isFormVisible, closeForm }) {
  const closeKeyboardHandler = () => Keyboard.dismiss();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(false);
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [description, setDescription] = useState();

  const onSubmit = () => {
    console.log({
      title,
      location,
      phoneNumber,
      description,
      startDate,
      endDate,
      isOnline,
    });
    closeForm();
  };

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
        <Input
          label="Titre"
          autoCorrect={false}
          maxLength={40}
          value={title}
          onChangeText={setTitle}
        />
        <Input
          label={isOnline ? "Url" : "Lieu"}
          inputMode={isOnline ? "url" : "text"}
          autoCorrect={false}
          value={location}
          onChangeText={setLocation}
        />
        <Input
          label="Téléphone"
          inputMode="tel"
          maxLength={10}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Input
          label="Description"
          multiline
          maxLength={120}
          value={description}
          onChangeText={setDescription}
        />
        <DateTimePicker
          label="Début"
          dateTime={startDate}
          setDateTime={setStartDate}
        />
        <DateTimePicker
          label="Fin"
          dateTime={endDate}
          setDateTime={setEndDate}
        />
        <IsOnline isEnabled={isOnline} setIsEnabled={setIsOnline} />
        <View style={styles.btnContainer}>
          <CustomBtn text="Annuler" color={colors.PINK} onPress={closeForm} />
          <CustomBtn text="Valider" color={colors.VIOLET} onPress={onSubmit} />
        </View>
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});