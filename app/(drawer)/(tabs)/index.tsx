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
  const router = useRouter();

  const handleCategoryPress = (category: string) => {
    router.push({
      pathname: '/(drawer)/categoria/[id]',
      params: { id: category.toLowerCase() }
    });
  };

  const handleOfferPress = (offer: any) => {
    router.push({
      pathname: '/(drawer)/produto/[id]',
      params: { id: offer.name.toLowerCase().replace(/\s+/g, '-') }
    });
  };

  const handleStorePress = (store: any) => {
    router.push({
      pathname: '/(drawer)/loja/[id]',
      params: { id: store.name.toLowerCase().replace(/\s+/g, '-') }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Olá, João!</Text>
          <TouchableOpacity onPress={() => router.push('/(drawer)/notificacoes')}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/(drawer)/banner')}>
          <Banner />
        </TouchableOpacity>

        <Text className="text-2xl font-semibold mt-5 mb-2 text-gray-800">Categorias</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
          {categories.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="items-center mr-5"
              onPress={() => handleCategoryPress(item.label)}
            >
              <View className="w-20 h-20 rounded-full bg-lime-100 items-center justify-center">
                <Image source={item.icon} className="w-15 h-15 bg-contain" />
              </View>
              <Text className="mt-2 text-sm text-gray-700">{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-2xl font-semibold mb-3 text-gray-800">Promoções com entrega grátis</Text>
        <FlatList
          data={offers}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          className="mb-6"
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handleOfferPress(item)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mr-4 w-36 items-center"
            >
              <Image source={item.image} className="w-16 h-16 mb-2" resizeMode="contain" />
              <Text className="text-xs text-center text-gray-700 mb-1m font-bold">{item.name}</Text>
              <Text className="text-green-600 font-bold text-xl">{item.price}</Text>
            </TouchableOpacity>
          )}
        />

        <Text className="text-base font-semibold mb-3 text-gray-800 gap-5">Lojas</Text>
        <View className="space-y-4 mb-6 gap-4">
          {stores.map((store, index) => (
            <TouchableOpacity 
              key={index} 
              className="flex-row items-center justify-between"
              onPress={() => handleStorePress(store)}
            >
              <View className="flex-row items-center space-x-3 gap-3">
                <Image source={store.icon} className="w-15 h-15 rounded-full" />
                <Text className="text-ms text-xl font-semibold text-gray-700">{store.name}</Text>
              </View>
              <Ionicons name="star-outline" size={20} color="#22c55e" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
