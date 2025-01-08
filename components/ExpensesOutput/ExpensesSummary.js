import { GlobalStyles } from '@/constants/styles';
import { StyleSheet, Text, View } from 'react-native';

export default function ExpensesSummary({ period, expenses }) {
	const expensesSum = expenses.reduce((sum, exp) => sum + exp.amount, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{period}</Text>
			<Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.pink100,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	period: {
		fontSize: 12,
		color: GlobalStyles.colors.accent700,
	},
	sum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.dark500,
	},
});
