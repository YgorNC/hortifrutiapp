import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermosScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();

  const getTitle = () => {
    switch (type) {
      case 'central-de-ajuda':
        return 'Central de Ajuda';
      case 'termos-de-serviços':
        return 'Termos de Serviços';
      case 'código-de-conduta':
        return 'Código de Conduta';
      case 'privacidade':
        return 'Política de Privacidade';
      default:
        return 'Documento';
    }
  };

  const handleBack = () => {
    router.push('/(drawer)/config');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={handleBack} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">{getTitle()}</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Text className="text-gray-600">
          Conteúdo do documento será exibido aqui. Esta é uma página temporária que será atualizada com o conteúdo real de cada documento.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
} 