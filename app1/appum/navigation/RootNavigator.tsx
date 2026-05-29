import { ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import { cores } from '../constants/theme';
import { AuthNavigator } from './AuthNavigator';
import { ConsumerNavigator } from './ConsumerNavigator';
import { StoreNavigator } from './StoreNavigator';
import { AdminNavigator } from './AdminNavigator';

const Stack = createNativeStackNavigator();

export function RootNavigator() {
  const { ready, currentUser } = useApp();

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: cores.fundo }}>
        <ActivityIndicator size="large" color={cores.primary} />
      </View>
    );
  }

  if (!currentUser) {
    return <AuthNavigator />;
  }

  if (currentUser.role === 'consumer') {
    return <ConsumerNavigator />;
  }
  if (currentUser.role === 'store') {
    return <StoreNavigator />;
  }
  return <AdminNavigator />;
}
