import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '@/store/expenses-context';
import { getDateMinusDays } from '@/util/date';
import { getExpenses } from '@/util/http';
import LoadingOverlay from '../ui/LoadingOverlay';
import ErrorOverlay from '../ui/ErrorOverlay';

export default function RecentExpenses() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();

	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const fetchExpenses = async () => {
			setIsLoading(true);

			try {
				const fetchedExpenses = await getExpenses();
				expensesCtx.setExpenses(fetchedExpenses);
			} catch (err) {
				setError(err.message);
			}

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

	if (!isLoading && error) {
		return <ErrorOverlay message={error} />;
	}

	return (
		<ExpensesOutput
			expensesPeriod='Last 7 Days'
			expenses={recentExpenses}
			fallbackText='No expenses registered for the last 7 days.'
		/>
	);
}
