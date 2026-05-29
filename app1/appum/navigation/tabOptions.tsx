import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cores, layout, sombra } from '../constants/theme';

export function tabScreenOptions(
  routeName: string,
  focused: boolean,
  color: string,
  size: number
) {
  const icons: Record<
    string,
    [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
  > = {
    Inicio: ['home', 'home-outline'],
    Buscar: ['search', 'search-outline'],
    Cupons: ['ticket', 'ticket-outline'],
    Chat: ['chatbubbles', 'chatbubbles-outline'],
    Perfil: ['person', 'person-outline'],
    Painel: ['stats-chart', 'stats-chart-outline'],
    Publicar: ['add-circle', 'add-circle-outline'],
    Mensagens: ['mail', 'mail-outline'],
    Admin: ['shield', 'shield-outline'],
    Lojas: ['storefront', 'storefront-outline'],
    Usuarios: ['people', 'people-outline'],
    Assinaturas: ['card', 'card-outline'],
    Categorias: ['grid', 'grid-outline'],
  };
  const pair = icons[routeName] ?? ['ellipse', 'ellipse-outline'];
  return <Ionicons name={focused ? pair[0] : pair[1]} size={size} color={color} />;
}

export const tabBarStyle = StyleSheet.create({
  bar: {
    backgroundColor: cores.barraNavegacao,
    borderTopWidth: 0,
    height: layout.tabHeight,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    ...sombra.tabBar,
  },
  label: { fontSize: 11, fontWeight: '600', marginTop: 2 },
}).bar;

export const tabBarLabelStyle = { fontSize: 11, fontWeight: '600' as const };
export const tabBarActiveTintColor = cores.primary;
export const tabBarInactiveTintColor = cores.textoSecundario;
