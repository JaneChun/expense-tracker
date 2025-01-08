import { FlatList, StyleSheet, Text } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
	function renderExpenseItem({ item }) {
		return <ExpenseItem {...item} />;
	}
	return (
		<FlatList
			data={expenses}
			keyExtractor={({ id }) => id}
			renderItem={renderExpenseItem}
		/>
	);
}

const styles = StyleSheet.create({});
