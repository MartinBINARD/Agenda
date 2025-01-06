import { useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFormattedDate, getFormattedTime } from "../../utils";

const DateTimePicker = ({ label, dateTime, setDateTime, error }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState("date");

  const showDate = () => {
    setMode("date");
    setDatePickerVisibility(true);
  };

  const showTime = () => {
    setMode("time");
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateTime(date);
    hideDatePicker();
  };

  const dateTimeStyles = [styles.dateTime];
  if (error) {
    dateTimeStyles.push(styles.error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dateAndTimeContainer}>
        <Pressable
          style={[styles.dateContainer, dateTimeStyles]}
          onPress={showDate}
        >
          <Text>{getFormattedDate(dateTime)}</Text>
        </Pressable>
        <Pressable
          style={[styles.timeContainer, dateTimeStyles]}
          onPress={showTime}
        >
          <Text>{getFormattedTime(dateTime)}</Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minuteInterval={15}
          locale="fr-FR"
          minimumDate={new Date(2024,0,1)}
          maximumDate={new Date(2040, 11, 31)}
          display="spinner"
          cancelTextIOS="Annuler"
          confirmTextIOS="Valider"
          date={new Date(dateTime)}
        />
      </View>
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  dateAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width / 1.5,
    alignItems: "center",
  },
  dateContainer: {
    width: "50%",
  },
  timeContainer: {
    width: "40%",
  },
  dateTime: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#ffd79e",
    fontWeight: "600",
    fontSize: 18,
  },
  error: {
    borderColor: "red",
    borderWidth: 3
  }
});