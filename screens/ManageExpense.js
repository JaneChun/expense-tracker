import { StyleSheet, Text, View } from 'react-native';
import { DUMMY_EXPENSES } from '@/components/ExpensesOutput/ExpensesOutput';
import { useLayoutEffect } from 'react';
import IconButton from '@/components/IconButton';
import Button from '@/components/Button';
import { GlobalStyles } from '@/constants/styles';

export default function ManageExpense({ route, navigation }) {
	const { id } = route.params ?? {};
	const isEditing = Boolean(id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? 'Edit Expense' : 'Add Expense',
		});
	}, [navigation, isEditing]);

	function deleteExpenseHandler() {
		navigation.goBack();
	}
	function canelHandler() {
		navigation.goBack();
	}
	function confirmHandler() {
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
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
