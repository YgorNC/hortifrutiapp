import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Platform, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Notificacoes() {
  const router = useRouter();

  const notifications = [
    {
      title: 'Entrega grátis',
      message: 'Frete grátis em seu próximo pedido',
      time: '5m',
      color: 'bg-green-100',
      icon: 'bicycle',
    },
    {
      title: 'Cupom de 10%',
      message: 'Clique e resgate seu cupom agora',
      time: '2h',
      color: 'bg-orange-100',
      icon: 'pricetag',
    },
    {
      title: 'Novidade na hortifruti',
      message: 'Chegaram maçãs gala fresquinhas',
      time: '3h',
      color: 'bg-blue-100',
      icon: 'storefront',
    },
    {
      title: 'Cupom de 20%',
      message: 'Aproveite o cupom de 20% OFF',
      time: '7h',
      color: 'bg-yellow-100',
      icon: 'pricetag',
    },
    {
      title: 'Entrega grátis',
      message: 'Frete grátis na sua próxima compra',
      time: '1d',
      color: 'bg-green-100',
      icon: 'bicycle',
    },
  ];

  return (
    <View style={styles.container} className="bg-white flex-1">
      <View style={styles.header} className="pb-3 px-4 border-b border-gray-200 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-base font-semibold text-gray-800">Notificações</Text>
        <View className="w-6" />
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 mb-3 flex-row items-start space-x-3">
            <View className={`w-8 h-8 rounded-full items-center justify-center ${item.color}`}>
              <Ionicons name={item.icon as any} size={16} color="black" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-800">{item.title}</Text>
              <Text className="text-xs text-gray-600">{item.message}</Text>
            </View>
            <Text className="text-xs text-gray-400">{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 48, // Android: status bar height, iOS: safe default
  },
  header: {
    paddingTop: 8,
  },
});
