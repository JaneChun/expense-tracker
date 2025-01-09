import { StyleSheet, View } from 'react-native';
import { useContext, useLayoutEffect, useState } from 'react';
import IconButton from '@/components/IconButton';
import ExpenseForm from '@/components/ManageExpense/ExpenseForm';
import { GlobalStyles } from '@/constants/styles';
import { ExpensesContext } from '@/store/expenses-context';
import { deleteExpense, postExpense, updateExpense } from '../util/http';
import LoadingOverlay from '@/ui/LoadingOverlay';
import ErrorOverlay from '@/ui/ErrorOverlay';

export default function ManageExpense({ route, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(false);

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
		setIsSubmitting(true);

		try {
			expensesCtx.deleteExpense({ id });
			await deleteExpense({ id });

			navigation.goBack();
		} catch (err) {
			setError(err.message);

			setIsSubmitting(false);
		}
	}

	function canelHandler() {
		navigation.goBack();
	}

	async function confirmHandler(expenseData) {
		setIsSubmitting(true);

		try {
			if (isEditing) {
				expensesCtx.updateExpense({ id, expenseData });
				await updateExpense({ id, expenseData });
			} else {
				const id = await postExpense({ expenseData });
				expensesCtx.addExpense({ id, expenseData });
			}

			navigation.goBack();
		} catch (err) {
			setError(err.message);

			setIsSubmitting(false);
		}
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
	}

	if (!isSubmitting && error) {
		return <ErrorOverlay message={error} />;
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
