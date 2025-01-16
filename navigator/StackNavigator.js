import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AgendaList from '../components/agenda/AgendaList';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { colors } from '../constants/colors';
import { useSignMutation } from '../store/api/authApi';
import { setToken } from '../store/slices/authSlice';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const token = useSelector((state) => state.auth.idToken);
    const [isLoading, setIsLoading] = useState(!!token ? false : true);
    const [singIn, { data, error }] = useSignMutation();
    const dispatch = useDispatch();

    const autoLogin = async () => {
        const values = await SecureStore.getItemAsync('credentials');

        if (values) {
            const credentials = JSON.parse(values);
            singIn({
                email: credentials.email,
                password: credentials.password,
                endpoint: 'signInWithPassword',
            });
        } else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            autoLogin();
        }
    }, [token]);

    useEffect(() => {
        if (data) {
            dispatch(setToken(data.idToken));
            setIsLoading(false);
        }
    }, [data]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator color={colors.WHITE} size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: colors.DARK,
                    },
                }}
            >
                {!!token ? (
                    <Stack.Screen component={AgendaList} name="Agenda" />
                ) : (
                    <>
                        <Stack.Screen component={Signup} name="Signup" />
                        <Stack.Screen component={Login} name="Login" />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
