import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { RootNavigator } from './navigation/RootNavigator';
import { cores } from './constants/theme';

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: cores.primary,
    background: cores.fundo,
    card: cores.fundoCard,
    text: cores.texto,
    border: cores.borda,
    notification: cores.primary,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AppProvider>
          <ToastProvider>
            <NavigationContainer theme={tema}>
              <RootNavigator />
            </NavigationContainer>
          </ToastProvider>
        </AppProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
