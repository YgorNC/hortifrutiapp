import React from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BuscarScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: 'Buscar' }} />
      <ScrollView className="flex-1 bg-white px-4 pt-14" showsVerticalScrollIndicator={false}>
        {/* Cabeçalho personalizado com botão de voltar */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-base font-medium text-gray-800">Buscar</Text>
          <View className="w-6" />
        </View>

        {/* Barra de pesquisa */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-6">
          <Ionicons name="search" size={20} color="#6B7280" className="mr-2" />
          <TextInput
            placeholder="O que deseja buscar?"
            className="flex-1 text-sm text-gray-700"
            placeholderTextColor="#999"
          />
        </View>

        {/* Ilustração e mensagem */}
        <View className="items-center justify-center mt-10">
          <Image
            source={require('../../../assets/farmer.png')}
            className="w-48 h-48 mb-4"
            resizeMode="contain"
          />
          <Text className="text-lg font-semibold text-center text-gray-800">
            Encontre seus produtos frescos
          </Text>
          <Text className="text-sm text-center text-gray-500 mt-2 px-6">
            Pesquise frutas, verduras, promoções e mais
          </Text>
        </View>
      </ScrollView>
    </>
  );
}
