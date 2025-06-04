import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Sacola() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-14">
      {/* Cabeçalho */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-base font-medium text-gray-800">Sacola</Text>
        <View className="w-6" />
      </View>

      {/* Conteúdo */}
      <View className="items-center justify-center mt-12">
        <Image
          source={require('../../../assets/farmer.png')}
          className="w-36 h-36 mb-6"
          resizeMode="contain"
        />
        <Text className="text-base font-semibold text-gray-800 text-center">Adicione algo na sacola</Text>
        <Text className="text-sm text-gray-600 text-center max-w-xs mt-2">
          Faça sua experiência comprando as melhores hortaliças
        </Text>
      </View>
    </ScrollView>
  );
}
