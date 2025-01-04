import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import Form from "../modal/Form";
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
  const [isFormVisible, setIsFormVisible] = useState(false);
  const closeFormHandler = () => setIsFormVisible(false);
  const openFormHandler = () => setIsFormVisible(true);

  return (
    <>
      <FlatList
        data={agendaItems}
        renderItem={({ item }) => <ListItem item={item} />}
        style={styles.listContainer}
        ItemSeparatorComponent={<View style={{ height: 24 }} />}
        ListHeaderComponent={<Header openForm={openFormHandler} />}
      />
      <Form isFormVisible={isFormVisible} closeForm={closeFormHandler} />
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