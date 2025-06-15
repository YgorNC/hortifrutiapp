import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BannerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Promoção em Destaque</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <Image 
            source={require('../../assets/frutas.png')}
            className="w-full h-48 rounded-lg mb-6"
            resizeMode="cover"
          />

          <Text className="text-2xl font-bold text-gray-800 mb-4">
            Promoção Especial
          </Text>

          <Text className="text-gray-600 mb-6">
            Descrição detalhada da promoção em destaque. Aqui você pode adicionar mais informações sobre a oferta especial.
          </Text>

          <View className="bg-gray-50 p-4 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-2">Detalhes da Promoção</Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">Válido até: 31/12/2024</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="information-circle-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">Consulte as condições</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="bg-green-600 py-4 rounded-lg items-center"
            onPress={() => {}}
          >
            <Text className="text-white font-bold text-lg">Ver Produtos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 