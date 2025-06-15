import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProdutoScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Detalhes do Produto</Text>
      </View>

      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="bg-gray-100 rounded-lg p-4 items-center mb-4">
            <Image 
              source={require('../../../assets/frutas.png')}
              className="w-48 h-48"
              resizeMode="contain"
            />
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {id.toString().replace(/-/g, ' ').toUpperCase()}
          </Text>
          
          <Text className="text-green-600 text-2xl font-bold mb-4">
            R$ 0,00
          </Text>

          <TouchableOpacity 
            className="bg-green-600 py-4 rounded-lg items-center"
            onPress={() => {}}
          >
            <Text className="text-white font-bold text-lg">Adicionar ao Carrinho</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 