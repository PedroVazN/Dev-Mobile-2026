import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import TelaSobre from './telas/Sobre';
import TelaProduto from './telas/Produtos/Index';
import TelaPerfil from './telas/Perfil';
import ListaProdutos from './telas/mocks/listaProdutos';
import { cores } from './constants/theme';

function MenuProdutos() {
  return <TelaProduto {...ListaProdutos} />;
}

const Tab = createBottomTabNavigator();

const temaNavegacao = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: cores.destaque,
    background: cores.fundo,
    card: cores.barraNavegacao,
    text: cores.texto,
    border: cores.borda,
    notification: cores.destaque,
  },
};

function Menu() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Catalogo') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: cores.destaque,
        tabBarInactiveTintColor: cores.textoSecundario,
        tabBarLabelStyle: styles.labelAba,
        tabBarStyle: styles.barra,
        tabBarItemStyle: styles.itemAba,
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={TelaSobre}
        options={{ tabBarLabel: 'Início', title: 'Início' }}
      />
      <Tab.Screen
        name="Catalogo"
        component={MenuProdutos}
        options={{ tabBarLabel: 'Catálogo', title: 'Catálogo' }}
      />
      <Tab.Screen
        name="Perfil"
        component={TelaPerfil}
        options={{ tabBarLabel: 'Perfil', title: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer theme={temaNavegacao}>
          <Menu />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: cores.barraNavegacao,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
    height: Platform.OS === 'ios' ? 88 : 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  labelAba: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  itemAba: {
    paddingVertical: 4,
  },
});
