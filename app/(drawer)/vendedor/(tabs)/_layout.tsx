import { Tabs } from 'expo-router';

export default function VendedorTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="pedidos-vendedor" />
      <Tabs.Screen name="adicionar-produto" />
    </Tabs>
  );
}
