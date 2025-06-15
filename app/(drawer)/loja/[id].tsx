import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LojaScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Detalhes da Loja</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row items-center mb-6">
            <Image 
              source={require('../../../assets/sacolao1.png')}
              className="w-20 h-20 rounded-full"
            />
            <View className="ml-4">
              <Text className="text-2xl font-bold text-gray-800">
                {id.toString().replace(/-/g, ' ').toUpperCase()}
              </Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="star" size={20} color="#22c55e" />
                <Text className="text-gray-600 ml-1">4.5 (120 avaliações)</Text>
              </View>
            </View>
          </View>

          <View className="bg-gray-50 p-4 rounded-lg mb-6">
            <Text className="text-lg font-semibold mb-2">Informações da Loja</Text>
            <View className="flex-row items-center mb-2">
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">Endereço da loja</Text>
            </View>
            <View className="flex-row items-center mb-2">
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">Horário de funcionamento</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={20} color="#666" />
              <Text className="text-gray-600 ml-2">(00) 0000-0000</Text>
            </View>
          </View>

          <Text className="text-xl font-bold mb-4">Produtos em Destaque</Text>
          {/* Aqui você pode adicionar a lista de produtos da loja */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 