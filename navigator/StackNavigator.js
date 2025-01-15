import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendaList from '../components/agenda/AgendaList';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import { colors } from '../constants/colors';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
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
                <Stack.Screen component={Signup} name="Signup" />
                <Stack.Screen component={Login} name="Login" />
                <Stack.Screen component={AgendaList} name="Agenda" />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
