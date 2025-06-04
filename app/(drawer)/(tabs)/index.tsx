import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Banner from '../../../components/banner';

const categories = [
  { label: 'Frutas', icon: require('../../../assets/frutas.png') },
  { label: 'Legumes', icon: require('../../../assets/legumes.png') },
  { label: 'Verduras', icon: require('../../../assets/verduras.png') },
  { label: 'Temperos', icon: require('../../../assets/temperos.png') },
];

const offers = [
  { name: '300g repolho verde', price: 'R$ 4,99', image: require('../../../assets/Repolho verde imagme.png') },
  { name: 'Cebola (kg)', price: 'R$ 6,70', image: require('../../../assets/Cebola imagme.png') },
  { name: 'Mamão formosa', price: 'R$ 7,99', image: require('../../../assets/Mamão Formosa imagem.png') },
  { name: 'Uva roxa (kg)', price: 'R$ 8,49', image: require('../../../assets/Uva tradicional imagem.png') },
];

const stores = [
  { name: 'Verdurão - Dona Florinda', icon: require('../../../assets/sacolao1.png') },
  { name: 'Sacolão do Tonhão', icon: require('../../../assets/sacolao2.png') },
  { name: 'Quitanda - Zenon Barriga', icon: require('../../../assets/sacolao3.png') },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter(); // para navegar via expo-router

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800">Olá, João!</Text>
          <TouchableOpacity onPress={() => router.push('/(drawer)/notificacoes')}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Banner />

        <Text className="text-base font-semibold mt-5 mb-2 text-gray-800">Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {categories.map((item, index) => (
            <View key={index} className="items-center mr-5">
              <View className="w-16 h-16 rounded-full bg-lime-100 items-center justify-center">
                <Image source={item.icon} className="w-10 h-10" />
              </View>
              <Text className="mt-2 text-sm text-gray-700">{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        <Text className="text-base font-semibold mb-3 text-gray-800">Promoções com entrega grátis</Text>
        <FlatList
          data={offers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          className="mb-6"
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mr-4 w-36 items-center">
              <Image source={item.image} className="w-16 h-16 mb-2" resizeMode="contain" />
              <Text className="text-xs text-center text-gray-700 mb-1">{item.name}</Text>
              <Text className="text-green-600 font-bold text-sm">{item.price}</Text>
            </View>
          )}
        />

        <Text className="text-base font-semibold mb-3 text-gray-800">Lojas</Text>
        <View className="space-y-4 mb-6">
          {stores.map((store, index) => (
            <View key={index} className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-3">
                <Image source={store.icon} className="w-10 h-10 rounded-full" />
                <Text className="text-sm text-gray-700">{store.name}</Text>
              </View>
              <Ionicons name="star-outline" size={20} color="#22c55e" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
