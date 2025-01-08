import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: () => {},
	deleteExpense: () => {},
	updateExpense: () => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const id = new Date().toString() + Math.random().toString();
			const newExpense = { id, ...action.payload };
			return [newExpense, ...state];

		case 'DELETE':
			return state.filter((exp) => exp.id !== action.payload.id);

		case 'UPDATE':
			const index = state.findIndex((exp) => exp.id === action.payload.id);
			const oldExpense = state[index];
			const updatedExpense = { ...oldExpense, ...action.payload.expenseData };

			const newState = [...state];
			newState[index] = updatedExpense;
			return newState;

		default:
			return state;
	}
}

export default function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

	function addExpense(expenseData) {
		dispatch({ type: 'ADD', payload: expenseData });
	}

	function deleteExpense(id) {
		dispatch({ type: 'DELETE', payload: id });
	}

	function updateExpense(id, expenseData) {
		dispatch({ type: 'UPDATE', payload: { id, expenseData } });
	}

	const value = {
		expenses: expensesState,
		addExpense,
		deleteExpense,
		updateExpense,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

const DUMMY_EXPENSES = [
	{
		id: 'e1',
		description: 'A pair of shoes',
		amount: 59.99,
		date: new Date('2024-01-01'),
	},
	{
		id: 'e2',
		description: 'A pair of trousers',
		amount: 89.29,
		date: new Date('2024-01-03'),
	},
	{
		id: 'e3',
		description: 'Some bananas',
		amount: 5.99,
		date: new Date('2024-01-05'),
	},
	{
		id: 'e4',
		description: 'A book',
		amount: 14.99,
		date: new Date('2024-01-9'),
	},
	{
		id: 'e5',
		description: 'Another book',
		amount: 18.99,
		date: new Date('2024-01-12'),
	},
];
