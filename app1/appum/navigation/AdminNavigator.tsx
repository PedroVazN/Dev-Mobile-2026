import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminStoresScreen } from '../screens/admin/AdminStoresScreen';
import { AdminUsersScreen } from '../screens/admin/AdminUsersScreen';
import { AdminSubscriptionsScreen } from '../screens/admin/AdminSubscriptionsScreen';
import { AdminCategoriesScreen } from '../screens/admin/AdminCategoriesScreen';
import {
  tabBarActiveTintColor,
  tabBarInactiveTintColor,
  tabBarLabelStyle,
  tabBarStyle,
  tabScreenOptions,
} from './tabOptions';

const Tab = createBottomTabNavigator();

export function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) =>
          tabScreenOptions(route.name, focused, color, size),
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        tabBarStyle,
        tabBarLabelStyle,
      })}
    >
      <Tab.Screen name="Admin" component={AdminDashboardScreen} options={{ tabBarLabel: 'Painel' }} />
      <Tab.Screen name="Lojas" component={AdminStoresScreen} />
      <Tab.Screen name="Usuarios" component={AdminUsersScreen} options={{ tabBarLabel: 'Usuários' }} />
      <Tab.Screen name="Assinaturas" component={AdminSubscriptionsScreen} />
      <Tab.Screen name="Categorias" component={AdminCategoriesScreen} />
    </Tab.Navigator>
  );
}
