import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { getFormattedDate, getFormattedTime } from '../../utils';

export default function ListItem({ item, selectItem }) {
    const selectItemHandler = () => {
        selectItem(item.id);
    };

    return (
        <Pressable style={[styles.itemContainer, item.isOnline ? styles.onlineItemContainer : undefined]} onPress={selectItemHandler}>
            <View style={styles.rowContainer}>
                <View style={styles.mainInfosContainer}>
                    <Text style={[styles.text, styles.itemTitle]}>{item.title}</Text>
                    <Text style={styles.text}>{item.location}</Text>
                    <Text style={styles.text}>{item.phoneNumber}</Text>
                </View>

                <View style={styles.datesContainer}>
                    <Text style={[styles.text, styles.dateText]}>
                        {getFormattedDate(item.startDate)} à {getFormattedTime(item.startDate)}
                    </Text>
                    <Text style={[styles.text, styles.dateText]}>
                        {getFormattedDate(item.endDate)} à {getFormattedTime(item.endDate)}
                    </Text>
                </View>
            </View>

            <View style={[styles.rowContainer, styles.bottomContainer]}>
                <Text style={[styles.text, styles.description]}>{item.description}</Text>
                {item.isOnline ? (
                    <View style={styles.onlineTextContainer}>
                        <Text style={styles.onlineText}>En ligne</Text>
                    </View>
                ) : null}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: colors.LIGHT,
        borderRadius: 8,
        padding: 12,
    },
    onlineItemContainer: {
        backgroundColor: colors.PINK,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    mainInfosContainer: {
        maxWidth: '45%',
    },
    datesContainer: {
        maxWidth: '45%',
    },
    text: {
        color: colors.DARK,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    dateText: {
        fontSize: 14,
    },
    bottomContainer: {
        marginTop: 16,
    },
    description: {
        maxWidth: '70%',
    },
    onlineTextContainer: {
        backgroundColor: colors.DARK,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    onlineText: {
        fontSize: 16,
        color: colors.LIGHT,
        fontWeight: '700',
    },
});
