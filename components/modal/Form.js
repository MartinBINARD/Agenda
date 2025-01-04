import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import CustomBtn from "./CustomBtn";
import DateTimePicker from "./DateTimePicker";
import Input from "./Input";
import IsOnline from "./IsOnline";

const initialState = {
  title: "",
  location: "",
  phoneNumber: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  isOnline: false,
};

export default function Form({ isFormVisible, closeForm, selectedEvent }) {
  const event = useSelector((state) =>
    state.agenda.events.find((event) => event.id === selectedEvent)
  );
  const closeKeyboardHandler = () => Keyboard.dismiss();
  const [formData, setFormData] = useState(initialState);

  const onFormChange = (key, value) => {
    setFormData((previous) => {
      return {
        ...previous,
        [key]: value,
      };
    });
  };

  const onSubmit = () => {
    closeForm();
    setFormData(initialState);
  };
  
  const closeFormHandler = () => {
    closeForm();
    setFormData(initialState);
  };

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

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
            onPress={closeFormHandler}
            suppressHighlighting={true}
          />
        </View>
        <Input
          label="Titre"
          autoCorrect={false}
          maxLength={40}
          value={formData.title}
          onChangeText={onFormChange.bind(this, "title")}
        />
        <Input
          label={formData.isOnline ? "Url" : "Lieu"}
          inputMode={formData.isOnline ? "url" : "text"}
          autoCorrect={false}
          maxLength={40}
          value={formData.location}
          onChangeText={onFormChange.bind(this, "location")}
        />
        <Input
          label="Téléphone"
          inputMode="tel"
          maxLength={10}
          value={formData.phoneNumber}
          onChangeText={onFormChange.bind(this, "phoneNumber")}
        />
        <Input
          label="Description"
          multiline
          maxLength={120}
          value={formData.description}
          onChangeText={onFormChange.bind(this, "description")}
        />
        <DateTimePicker
          label="Début"
          dateTime={formData.startDate}
          setDateTime={onFormChange.bind(this, "startDate")}
        />
        <DateTimePicker
          label="Fin"
          dateTime={formData.endDate}
          setDateTime={onFormChange.bind(this, "endDate")}
        />
        <IsOnline
          isEnabled={formData.isOnline}
          setIsEnabled={onFormChange.bind(this, "isOnline")}
        />
        <View style={styles.btnContainer}>
          <CustomBtn text="Annuler" color={colors.PINK} onPress={closeFormHandler} />
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