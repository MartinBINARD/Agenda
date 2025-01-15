import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/colors';

const CustomBtn = ({ text, onPress, color, isLoading = false }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.btn, { backgroundColor: color }]}>
            {isLoading ? <ActivityIndicator color={colors.WHITE} size="small" /> : <Text style={styles.text}>{text}</Text>}
        </TouchableOpacity>
    );
};

export default CustomBtn;

const styles = StyleSheet.create({
    btn: {
        width: 140,
        height: 60,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: '800',
        fontSize: 24,
    },
});
