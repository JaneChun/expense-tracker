import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';

export default function ExpenseForm() {
	function amountChangeHandler() {}
	function dateChangeHandler() {}
	function descriptionChangeHandler() {}

	return (
		<View style={styles.formContainer}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					style={styles.rowInput}
					label='Amount'
					textInputConfing={{
						keyboardType: 'decimal-pad',
						onChangeText: amountChangeHandler,
					}}
				/>
				<Input
					style={styles.rowInput}
					label='Date'
					textInputConfing={{
						keyboardType: 'default',
						placeholder: 'YYYY-MM-DD',
						maxLength: 10,
						onChangeText: dateChangeHandler,
					}}
				/>
			</View>
			<Input
				label='Description'
				textInputConfing={{
					keyboardType: 'default',
					multiline: true,
					onChangeText: descriptionChangeHandler,
				}}
			/>
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
});
