import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/consumer/HomeScreen';
import { SearchScreen } from '../screens/consumer/SearchScreen';
import { CouponsScreen } from '../screens/consumer/CouponsScreen';
import { ChatScreen } from '../screens/consumer/ChatScreen';
import { ProfileScreen } from '../screens/consumer/ProfileScreen';
import { StoreDetailScreen } from '../screens/consumer/StoreDetailScreen';
import { ChatRoomScreen } from '../screens/consumer/ChatRoomScreen';
import {
  tabBarActiveTintColor,
  tabBarInactiveTintColor,
  tabBarLabelStyle,
  tabBarStyle,
  tabScreenOptions,
} from './tabOptions';
import type { ConsumerStackParamList } from './types';
import { cores } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<ConsumerStackParamList>();

function ConsumerTabs() {
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
      <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
      <Tab.Screen name="Buscar" component={SearchScreen} />
      <Tab.Screen name="Cupons" component={CouponsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function ConsumerNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: cores.fundoCard },
        headerTintColor: cores.texto,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="ConsumerTabs"
        component={ConsumerTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StoreDetail"
        component={StoreDetailScreen}
        options={{ title: 'Loja' }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route }) => ({ title: route.params.storeName })}
      />
    </Stack.Navigator>
  );
}
