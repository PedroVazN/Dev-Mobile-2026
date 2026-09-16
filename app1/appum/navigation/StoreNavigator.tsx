import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StoreDashboardScreen } from '../screens/store/StoreDashboardScreen';
import { StorePublishScreen } from '../screens/store/StorePublishScreen';
import { StoreCouponsScreen } from '../screens/store/StoreCouponsScreen';
import { StoreMessagesScreen } from '../screens/store/StoreMessagesScreen';
import { StoreProfileScreen } from '../screens/store/StoreProfileScreen';
import {
  tabBarActiveTintColor,
  tabBarInactiveTintColor,
  tabBarLabelStyle,
  tabBarStyle,
  tabScreenOptions,
} from './tabOptions';

const Tab = createBottomTabNavigator();

export function StoreNavigator() {
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
      <Tab.Screen name="Painel" component={StoreDashboardScreen} />
      <Tab.Screen name="Publicar" component={StorePublishScreen} />
      <Tab.Screen name="Cupons" component={StoreCouponsScreen} />
      <Tab.Screen name="Mensagens" component={StoreMessagesScreen} />
      <Tab.Screen name="Perfil" component={StoreProfileScreen} />
    </Tab.Navigator>
  );
}
