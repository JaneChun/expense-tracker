import axios from 'axios';
const URL = 'https://expense-tracker-716ee-default-rtdb.firebaseio.com';

export const postExpense = async ({ expenseData }) => {
	const response = await axios.post(`${URL}/expenses.json`, expenseData);
	const id = response.data.name;
	return id;
};

export const getExpenses = async () => {
	const response = await axios.get(`${URL}/expenses.json`);

	const expenses = [];

	for (const key in response.data) {
		const expense = {
			id: key,
			amount: response.data[key].amount,
			date: new Date(response.data[key].date),
			description: response.data[key].description,
		};
		expenses.push(expense);
	}
	return expenses;
};
