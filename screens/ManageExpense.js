import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '@/components/IconButton';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { deleteExpense, postExpense, updateExpense } from '../util/http';

export default function ManageExpense({ route, navigation }) {
	const expensesCtx = useContext(ExpensesContext);

	const { id } = route.params ?? {};
	const isEditing = Boolean(id);
	const expense = expensesCtx.expenses.find((exp) => exp.id === id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	async function deleteExpenseHandler() {
		expensesCtx.deleteExpense({ id });
		await deleteExpense({ id });
		navigation.goBack();
	}

	function canelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		if (isEditing) {
			expensesCtx.updateExpense({ id, expenseData });
			await updateExpense({ id, expenseData });
		} else {
			const id = await postExpense({ expenseData });
			expensesCtx.addExpense({ id, expenseData });
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				onSubmit={confirmHandler}
				onCancel={canelHandler}
				submitButtonLabel={isEditing ? 'Confirm' : 'Add'}
				defaultValues={expense}
			/>

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
});
