import { GlobalStyles } from '@/constants/styles';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';

export default function ExpenseItem({ id, description, date, amount }) {
	const navigation = useNavigation();
	function expensePressHandler() {
		navigation.navigate('ManageExpense', { id });
	}

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.container}>
				<View>
					<Text style={[styles.text, styles.description]}>{description}</Text>
					<Text style={styles.text}>{getFormattedDate(date)}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={[styles.text, styles.amount]}>${amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: GlobalStyles.colors.dark500,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 6,
		elevation: 3,
		shadowColor: GlobalStyles.colors.dark900,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4,
	},
	text: {
		color: GlobalStyles.colors.pink50,
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
	},
	amountContainer: {
		minWidth: 80,
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	amount: {
		color: GlobalStyles.colors.dark500,
		fontWeight: 'bold',
	},
	pressed: {
		opacity: 0.75,
	},
});
