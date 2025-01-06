import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { getAllEvents } from "../../lib";
import { setEvents } from "../../store/slices/agendaSlice";
import FormWithFormik from "../modal/FormWithFormik";
import ListItem from "./ListItem";

const Header = ({ openForm }) => (
  <View style={styles.headerContainer}>
    <View />
    <Text style={styles.title}>AGENDA</Text>
    <AntDesign
      name="pluscircle"
      size={32}
      color={colors.PINK}
      suppressHighlighting={true}
      onPress={openForm}
    />
  </View>
);

export default function AgendaList() {

  const agendaItems = useSelector((state) => state.agenda.events);
  const dispatch = useDispatch();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const closeFormHandler = () => {
    setIsFormVisible(false);
    setSelectedEvent();
  };
  const openFormHandler = () => setIsFormVisible(true);

  const selectEventHandler = (id) => {
    setSelectedEvent(id);
    setIsFormVisible(true);
  };

  const getEvents = async () => {
    const events = await getAllEvents();
    dispatch(setEvents(events));
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <FlatList
        data={[...agendaItems].sort((a,b) => new Date(a.startDate) - new Date(b.startDate))}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={<View style={{ height: 24 }} />}
        style={styles.listContainer}
        renderItem={({ item }) => (
          <ListItem item={item} selectItem={selectEventHandler} />
        )}
        ListHeaderComponent={<Header openForm={openFormHandler} />}
      />
      <FormWithFormik
        isFormVisible={isFormVisible}
        closeForm={closeFormHandler}
        selectedEvent={selectedEvent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 16,
    backgroundColor: colors.DARK,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.VIOLET,
  },
});