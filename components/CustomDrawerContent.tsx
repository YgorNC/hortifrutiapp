import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const menuItems = [
  { label: 'Início', route: '/(drawer)', icon: 'home-outline' },
  { label: 'Busca', route: '/(drawer)/busca', icon: 'search-outline' },
  { label: 'Perfil', route: '/(drawer)/perfil', icon: 'person-outline' },
  { label: 'Sacola', route: '/(drawer)/sacola', icon: 'cart-outline' },
  { label: 'Notificações', route: '/(drawer)/notificacoes', icon: 'notifications-outline' },
  { label: 'Configurações', route: '/(drawer)/config', icon: 'settings-outline' },
] as const;

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}
    >
      {/* Ícone de Perfil */}
      <View className="items-center mb-8">
        <View className="w-20 h-20 rounded-full border border-gray-300 items-center justify-center">
          <Ionicons name="person-outline" size={48} color="#333" />
        </View>
      </View>

      {/* Itens do menu */}
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center py-3 mb-1"
          onPress={() => {
            if (item.route) {
              router.push(item.route as any);
            }
          }}
        >
          <Ionicons name={item.icon} size={24} color="#333" className="mr-4" />
          <Text className="text-base text-gray-800">{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Botão Sair – menor, verde e ajustado */}
      <View className="flex-1 justify-end items-start mb-8">
        <TouchableOpacity
          className="flex-row items-center bg-green-600 rounded-full px-4 py-2"
          onPress={() => {
            router.replace('/login'); // Ajuste aqui conforme seu fluxo de logout
          }}
        >
          <Ionicons name="power-outline" size={18} color="white" className="mr-2" />
          <Text className="text-sm font-medium text-white">Sair</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}
