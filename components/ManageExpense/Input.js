import { GlobalStyles } from '@/constants/styles';
import { Text, View, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, style, textInputConfing, value }) {
	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				value={value}
				style={[
					styles.textInput,
					textInputConfing.multiline && styles.multiline,
				]}
				{...textInputConfing}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.accent500,
		marginBottom: 4,
	},
	textInput: {
		backgroundColor: GlobalStyles.colors.pink100,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		color: GlobalStyles.colors.dark500,
	},
	multiline: {
		minHeight: 100,
		textAlignVertical: 'top',
	},
});
