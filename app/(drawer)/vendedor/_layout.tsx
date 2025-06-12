import { Drawer } from 'expo-router/drawer';

export default function VendedorDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // <- Isso esconde o cabeçalho padrão!
      }}
    >
      <Drawer.Screen name="home" options={{ title: 'Painel de Desempenho' }} />
      <Drawer.Screen name="adicionar-produto" options={{ title: 'Adicionar Produto' }} />
      <Drawer.Screen name="pedidos-recentes" options={{ title: 'Pedidos Recentes' }} />
    </Drawer>
  );
}
