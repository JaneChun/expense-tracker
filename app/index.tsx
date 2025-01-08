import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GlobalStyles } from '../constants/styles';
import { AntDesign } from '@expo/vector-icons';

import ManageExpense from '../screens/ManageExpense';
import AllExpenses from '../screens/AllExpenses';
import RecentExpenses from '../screens/RecentExpenses';
import IconButton from '../components/IconButton';

export default function Index() {
	const Stack = createNativeStackNavigator();
	const BottomTab = createBottomTabNavigator();

	function ExpensesOverview() {
		return (
			<BottomTab.Navigator
				screenOptions={({ navigation }) => ({
					headerStyle: { backgroundColor: GlobalStyles.colors.dark500 },
					headerTintColor: 'white',
					tabBarStyle: { backgroundColor: GlobalStyles.colors.dark500 },
					tabBarActiveTintColor: GlobalStyles.colors.accent500,
					headerRight: ({ tintColor }) => (
						<IconButton
							icon='add-circle-sharp'
							color={tintColor}
							size={24}
							onPress={() => {
								navigation.navigate('ManageExpense');
							}}
						/>
					),
				})}
			>
				<BottomTab.Screen
					name='RecentExpenses'
					component={RecentExpenses}
					options={{
						title: 'Recent Expenses',
						tabBarLabel: 'Recent',
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='hourglass' color={color} size={size} />
						),
					}}
				/>
				<BottomTab.Screen
					name='AllExpenses'
					component={AllExpenses}
					options={{
						title: 'All Expenses',
						tabBarLabel: 'All Expenses',
						tabBarIcon: ({ color, size }) => (
							<AntDesign name='calendar' color={color} size={size} />
						),
					}}
				/>
			</BottomTab.Navigator>
		);
	}

	return (
		<>
			<StatusBar style='auto' />
			<Stack.Navigator
				screenOptions={{
					headerStyle: { backgroundColor: GlobalStyles.colors.dark500 },
					headerTintColor: 'white',
				}}
			>
				<Stack.Screen
					name='ExpensesOverview'
					component={ExpensesOverview}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='ManageExpense'
					component={ManageExpense}
					options={{ title: 'Manage Expense', presentation: 'modal' }}
				/>
			</Stack.Navigator>
		</>
	);
}
