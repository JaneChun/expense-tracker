import { StyleSheet, View } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '@/constants/styles';

export default function ExpensesOutput({ expenses, expensesPeriod }) {
	return (
		<View style={styles.container}>
			<ExpensesSummary period={expensesPeriod} expenses={DUMMY_EXPENSES} />
			<ExpensesList expenses={DUMMY_EXPENSES} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700,
	},
});

const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'A pair of shoes',
		amount: 59.99,
		date: new Date('2024-01-01'),
	},
	{
		id: 'e2',
		description: 'A pair of trousers',
		amount: 89.29,
		date: new Date('2024-01-03'),
	},
	{
		id: 'e3',
		description: 'Some bananas',
		amount: 5.99,
		date: new Date('2024-01-05'),
	},
	{
		id: 'e4',
		description: 'A book',
		amount: 14.99,
		date: new Date('2024-01-9'),
	},
	{
		id: 'e5',
		description: 'Another book',
		amount: 18.99,
		date: new Date('2024-01-12'),
	},
];
