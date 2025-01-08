import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/expenses-context';
import { getDateMinusDays } from '@/util/date';

export default function RecentExpenses() {
	const expensesCtx = useContext(ExpensesContext);

	const recentExpenses = expensesCtx.expenses.filter(({ date }) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return date7DaysAgo < date;
	});

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 Days'
			expenses={recentExpenses}
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}
