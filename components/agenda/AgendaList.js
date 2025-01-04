import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import ListItem from "./ListItem";

const Header = () => (
  <View style={styles.headerContainer}>
    <Text></Text>
    <Text style={styles.title}>AGENDA</Text>
    <Ionicons name="add-circle" size={32} color={colors.PINK} />
  </View>
);

export default function AgendaList() {
  const agendaItems = useSelector((state) => state.agenda.events);

  return (
    <FlatList
      data={agendaItems}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={<View style={{ height: 24 }} />}
      style={styles.listContainer}
      renderItem={({ item }) => <ListItem item={item} />}
      ListHeaderComponent={<Header />}
    />
  );
}

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