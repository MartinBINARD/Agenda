import { AntDesign } from '@expo/vector-icons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../constants/colors';
import { useGetAllEventsQuery } from '../../store/api/agendaApi.js';
import { setToken } from '../../store/slices/authSlice.js';
import FormWithFormik from '../modal/FormWithFormik';
import ListItem from './ListItem';

const Header = ({ openForm, logout }) => (
    <View style={styles.headerContainer}>
        <SimpleLineIcons name="logout" size={24} color={colors.VIOLET} onPress={logout} />
        <Text style={styles.title}>AGENDA</Text>
        <AntDesign name="pluscircle" size={32} color={colors.PINK} suppressHighlighting={true} onPress={openForm} />
    </View>
);

const ListEmptyComponent = ({ isLoading, error }) => (
    <View style={styles.listEmptyContainer}>
        {isLoading ? <ActivityIndicator color={colors.WHITE} size="large" /> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
);

export default function AgendaList() {
    // const agendaItems = useSelector((state) => state.agenda.events);
    // const getEvents = async () => {
    //   try {
    //     const events = await getAllEvents();
    //     dispatch(setEvents(events));
    //   } catch (error) {
    //     setHttpError(true);
    //   }
    // };

    // useEffect(() => {
    //   setIsLoading(true);
    //   setTimeout(() => {
    //     getEvents();
    //     setIsLoading(false);
    //   }, 2000);
    // }, []);

    // const [isLoading, setIsLoading] = useState(false);
    // const [httpError, setHttpError] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.idToken);
    const { data, isLoading: loading, error } = useGetAllEventsQuery(token);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState();

    const openFormHandler = () => setIsFormVisible(true);
    const closeFormHandler = () => {
        setIsFormVisible(false);
        setSelectedEvent();
    };

    const selectEventHandler = (id) => {
        setSelectedEvent(id);
        setIsFormVisible(true);
    };

    const logout = () => {
        dispatch(setToken());
        SecureStore.deleteItemAsync('credentials');
        SecureStore.deleteItemAsync('refreshToken');
    };

    return (
        <>
            <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={<View style={{ height: 24 }} />}
                style={styles.listContainer}
                renderItem={({ item }) => <ListItem item={item} selectItem={selectEventHandler} />}
                ListHeaderComponent={<Header openForm={openFormHandler} logout={logout} />}
                ListEmptyComponent={<ListEmptyComponent isLoading={loading} error={error} />}
            />
            <FormWithFormik isFormVisible={isFormVisible} closeForm={closeFormHandler} selectedEvent={selectedEvent} />
        </>
    );
}

const styles = StyleSheet.create({
    listEmptyContainer: {
        height: Dimensions.get('screen').height / 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    errorText: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.WHITE,
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
        paddingHorizontal: 16,
        backgroundColor: colors.DARK,
    },
    title: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.VIOLET,
    },
});
