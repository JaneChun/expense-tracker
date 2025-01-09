import { GlobalStyles } from '@/constants/styles';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Input({
	label,
	style,
	textInputConfing,
	value,
	invalid,
}) {
	return (
		<View style={[styles.inputContainer, style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>
				{label}
				{invalid && <FontAwesome6 name='circle-exclamation' />}
			</Text>
			<TextInput
				value={value}
				style={[
					styles.textInput,
					textInputConfing.multiline && styles.multiline,
					invalid && styles.invalidInput,
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
	invalidLabel: {},
	invalidInput: {
		backgroundColor: GlobalStyles.colors.error50,
	},
});
