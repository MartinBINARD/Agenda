import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../constants/colors';

export default function Input({ label, error, type, ...inputProps }) {
    const inputStyles = [styles.input];
    const containerStyle = [styles.inputContainer];

    if (inputProps?.multiline) {
        inputStyles.push(styles.multilineInput);
    }

    if (error) {
        inputStyles.push(styles.inputError);
    }

    if (type === 'password') {
        containerStyle.push({
            marginTop: 12,
        });
    }

    return (
        <View style={containerStyle}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...inputProps} secureTextEntry={type === 'password'} />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        marginBottom: 4,
        color: colors.LIGHT,
        fontWeight: '600',
        fontSize: 18,
    },
    input: {
        height: 48,
        borderRadius: 12,
        backgroundColor: colors.WHITE,
        paddingHorizontal: 12,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
        paddingTop: 6,
    },
    inputError: {
        borderColor: 'red',
        borderWidth: 3,
    },
});
