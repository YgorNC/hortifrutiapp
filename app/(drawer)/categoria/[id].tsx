import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CategoriaScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 capitalize">{id}</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-lg text-gray-600 mb-4">
          Produtos da categoria {id}
        </Text>
        {/* Aqui você pode adicionar a lista de produtos da categoria */}
      </ScrollView>
    </SafeAreaView>
  );
} 