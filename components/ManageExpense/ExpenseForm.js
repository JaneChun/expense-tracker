import { Alert, StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '@/components/Button';
import { getFormattedDate } from '@/util/date';
import { GlobalStyles } from '@/constants/styles';

export default function ExpenseForm({
	onCancel,
	onSubmit,
	submitButtonLabel,
	defaultValues,
}) {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : '',
			isValid: true,
		},
		date: {
			value: defaultValues
				? getFormattedDate(defaultValues.date)
				: getFormattedDate(new Date()),
			isValid: true,
		},
		description: {
			value: defaultValues ? defaultValues.description : '',
			isValid: true,
		},
	});

	function inputChangeHandler(key, enteredValue) {
		setInputs((curInputs) => ({
			...curInputs,
			[key]: { value: enteredValue, isValid: true },
		}));
	}

	function submitHandler() {
		const expenseData = {
			amount: +inputs.amount.value,
			date: new Date(inputs.date.value),
			description: inputs.description.value,
		};

		const isAmountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
		const isDateValid = expenseData.date.toString() !== 'Invalid Date';
		const isDescriptionValid = expenseData.description.trim().length > 0;

		if (!isAmountValid || !isDateValid || !isDescriptionValid) {
			setInputs((curInputs) => ({
				amount: { value: curInputs.amount.value, isValid: isAmountValid },
				date: { value: curInputs.date.value, isValid: isDateValid },
				description: {
					value: curInputs.description.value,
					isValid: isDescriptionValid,
				},
			}));
			// Alert.alert('Invalid Input', 'Please check your input values');
			return;
		}

		onSubmit(expenseData);
	}

	const isFormInvalid =
		!inputs.amount.isValid ||
		!inputs.date.isValid ||
		!inputs.description.isValid;

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
					value={inputs.amount.value}
					invalid={!inputs.amount.isValid}
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
					value={inputs.date.value}
					invalid={!inputs.date.isValid}
				/>
			</View>
			<Input
				label='Description'
				textInputConfing={{
					keyboardType: 'default',
					multiline: true,
					onChangeText: (value) => inputChangeHandler('description', value),
				}}
				value={inputs.description.value}
				invalid={!inputs.description.isValid}
			/>

			{isFormInvalid && (
				<Text style={styles.errorText}>
					Invalid input values - Please check your entered data.
				</Text>
			)}
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
	errorText: {
		color: GlobalStyles.colors.error500,
		margin: 8,
	},
});
