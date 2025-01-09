import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
	expenses: [],
	addExpense: () => {},
	deleteExpense: () => {},
	updateExpense: () => {},
	setExpenses: () => {},
});

function expensesReducer(state, action) {
	switch (action.type) {
		case 'ADD':
			const { id, expenseData } = action.payload;

			const newExpense = { id, ...expenseData };
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

		case 'SET':
			return action.payload;
		default:
			return state;
	}
}

export default function ExpensesContextProvider({ children }) {
	const [expensesState, dispatch] = useReducer(expensesReducer, []);

	function addExpense({ expenseData }) {
		dispatch({ type: 'ADD', payload: { expenseData } });
	}

	function deleteExpense({ id }) {
		dispatch({ type: 'DELETE', payload: { id } });
	}

	function updateExpense({ id, expenseData }) {
		dispatch({ type: 'UPDATE', payload: { id, expenseData } });
	}

	function setExpenses(expenses) {
		expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
		dispatch({ type: 'SET', payload: expenses });
	}

	const value = {
		expenses: expensesState,
		addExpense,
		deleteExpense,
		updateExpense,
		setExpenses,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}
