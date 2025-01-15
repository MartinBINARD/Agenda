import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { colors } from './constants/colors';
import StackNavigator from './navigator/StackNavigator';

export default function App() {
    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <StackNavigator />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.DARK,
    },
});
