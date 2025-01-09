import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/expenses-context';
import { getDateMinusDays } from '@/util/date';
import { getExpenses } from '@/util/http';
import LoadingOverlay from '../ui/LoadingOverlay';

export default function RecentExpenses() {
	const [isLoading, setIsLoading] = useState(true);
	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const fetchExpenses = async () => {
			setIsLoading(true);
			const fetchedExpenses = await getExpenses();
			expensesCtx.setExpenses(fetchedExpenses);
			setIsLoading(false);
		};

		fetchExpenses();
	}, []);

	const recentExpenses = expensesCtx.expenses.filter(({ date }) => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return date7DaysAgo < date;
	});

	if (isLoading) {
		return <LoadingOverlay />;
	}

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 Days'
			expenses={recentExpenses}
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}
