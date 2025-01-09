import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '@/components/Button';
import { getFormattedDate } from '@/util/date';

export default function ExpenseForm({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}) {
	const [inputValues, setInputValues] = useState({
		amount: defaultValues ? defaultValues.amount.toString() : '',
		date: defaultValues ? getFormattedDate(defaultValues.date) : '',
		description: defaultValues ? defaultValues.description : '',
	});

	function inputChangeHandler(key, enteredValue) {
		setInputValues((curInputValues) => ({
			...curInputValues,
			[key]: enteredValue,
		}));
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputValues.amount,
			date: new Date(inputValues.date),
			description: inputValues.description,
		};
		onSubmit(expenseData);
	}

	return (
		<View style={styles.formContainer}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label='Amount'
					textInputConfing={{
						keyboardType: 'decimal-pad',
						onChangeText: (value) => inputChangeHandler('amount', value),
					}}
					value={inputValues.amount}
				/>
				<Input
					style={styles.rowInput}
					label='Date'
					textInputConfing={{
						keyboardType: 'default',
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: (value) => inputChangeHandler('date', value),
					}}
					value={inputValues.date}
				/>
			</View>
			<Input
				label='Description'
				textInputConfing={{
					keyboardType: 'default',
					multiline: true,
					onChangeText: (value) => inputChangeHandler('description', value),
				}}
				value={inputValues.description}
			/>

			<View style={styles.buttonsContainer}>
				<Button onPress={submitHandler} style={styles.button}>
					{submitButtonLabel}
				</Button>
				<Button mode='flat' onPress={onCancel} style={styles.button}>
					Cancel
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		marginTop: 40,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	rowInput: {
		flex: 1,
	},
	buttonsContainer: {
		marginTop: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8,
	},
});
