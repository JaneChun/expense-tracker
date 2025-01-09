import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '@/components/IconButton';
import Button from '@/components/Button';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';

export default function ManageExpense({ route, navigation }) {
	const expensesCtx = useContext(ExpensesContext);

	const { id } = route.params ?? {};
	const isEditing = Boolean(id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		expensesCtx.deleteExpense({ id });
		navigation.goBack();
	}
	function canelHandler() {
		navigation.goBack();
	}
	function confirmHandler() {
		if (isEditing) {
			expensesCtx.updateExpense({ id, expenseData: { amount: 0 } });
		} else {
			expensesCtx.addExpense({
				expenseData: {
					description: 'Test',
					amount: 19.99,
					date: new Date(),
				},
			});
		}

		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm />
			<View style={styles.buttonsContainer}>
				<Button onPress={confirmHandler} style={styles.button}>
					{isEditing ? 'Confirm' : 'Add'}
				</Button>
				<Button mode='flat' onPress={canelHandler} style={styles.button}>
					Cancel
				</Button>
			</View>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						icon='trash'
						color={GlobalStyles.colors.error500}
						size={24}
						onPress={deleteExpenseHandler}
					></IconButton>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.dark700,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 2,
		borderTopColor: GlobalStyles.colors.pink200,
		alignItems: 'center',
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
