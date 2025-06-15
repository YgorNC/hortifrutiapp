import { Drawer } from 'expo-router/drawer';
import VendedorDrawerContent from '../../../components/VendedorDrawerContent';

export default function VendedorDrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <VendedorDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="vendedor-home"
        options={{
          title: 'Home',
          drawerLabel: 'Home',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="adcionar-produto"
        options={{
          title: 'Adicionar Produto',
          drawerLabel: 'Adicionar Produto',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="pedidos-recentes"
        options={{
          title: 'Pedidos Recentes',
          drawerLabel: 'Pedidos Recentes',
        }}
      />
      <Drawer.Screen
        name="configuracoes"
        options={{
          title: 'Configurações',
          drawerLabel: 'Configurações',
        }}
      />
      <Drawer.Screen
        name="perfil-vendedor"
        options={{
          title: 'Perfil',
          drawerLabel: 'Perfil',
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="relatorio-desempenho"
        options={{
          title: 'Relatório de Desempenho',
          drawerLabel: 'Relatório de Desempenho',
          headerShown: false,
        }}
      />
    </Drawer>
  );
}
