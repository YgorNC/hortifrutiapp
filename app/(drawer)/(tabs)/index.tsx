import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Banner from '../../../components/banner';

const baseUrl = 'https://nova-pasta-orpin.vercel.app/api';
const defaultImage = require('../../../assets/banner1.jpg');
const defaultStoreImage = require('../../../assets/frutas.png');

export default function HomeScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [storedData, setStoredData] = useState<any>(null);

  useEffect(() => {
    const carregarUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userData');
        if (storedData) {
          setStoredData(JSON.parse(storedData));
        }
            console.log(storedData)

      } catch (err) {
        console.error('Erro ao carregar dados do usuário:', err);
      }
    };


    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${baseUrl}/products`);
        if (!response.ok) throw new Error('Erro ao buscar produtos');
        const data = await response.json();
        setProdutos(data);

        const nomesCategorias = data.reduce((acc: Set<string>, item: any) => {
          const nome = item.nome.toLowerCase();
          if (nome.includes('fruta') || nome.includes('maçã') || nome.includes('banana')) {
            acc.add('Frutas');
          } else if (nome.includes('legume') || nome.includes('batata') || nome.includes('cenoura')) {
            acc.add('Legumes');
          } else if (nome.includes('verdura') || nome.includes('alface') || nome.includes('couve')) {
            acc.add('Verduras');
          } else if (nome.includes('tempero') || nome.includes('alho') || nome.includes('cebola')) {
            acc.add('Temperos');
          } else {
            acc.add('Outros');
          }
          return acc;
        }, new Set<string>());
        setCategorias(Array.from(nomesCategorias));
      } catch (err) {
        console.error('Erro produtos:', err);
        setErro(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchVendedores = async () => {
      try {
        const response = await fetch(`${baseUrl}/vendedores`);
        if (!response.ok) throw new Error('Erro ao buscar vendedores');
        const data = await response.json();
        setVendedores(data);
      } catch (err) {
        console.error('Erro vendedores:', err);
      }
    };

    carregarUserData();
    fetchProdutos();
    fetchVendedores();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4">
        {/* Header */}
        <View className="flex-row items-center justify-between mt-4 mb-6">
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">
            Olá, {storedData?.name ?? 'visitante'}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(drawer)/notificacoes')}>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <Banner />

        {/* Categorias Dinâmicas */}
        <Text className="text-2xl font-semibold mt-5 mb-2 text-gray-800">Categorias</Text>
        {categorias.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
            {categorias.map((categoria, index) => (
              <View key={index} className="items-center mr-5">
                <View className="w-20 h-20 rounded-full bg-lime-100 items-center justify-center">
                  <Ionicons name="leaf" size={28} color="#22c55e" />
                </View>
                <Text className="mt-2 text-sm text-gray-700">{categoria}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Lista de Produtos */}
        <Text className="text-2xl font-semibold mb-3 text-gray-800">
          Promoções com entrega grátis
        </Text>
        {loading ? (
          <ActivityIndicator size="large" color="#22c55e" className="my-6" />
        ) : erro ? (
          <Text className="text-red-600 my-6">Erro ao carregar os produtos. Tente novamente.</Text>
        ) : (
          <FlatList
            data={produtos}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            className="mb-6"
            renderItem={({ item }) => (
              <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mr-4 w-36 items-center">
                <Image
                  source={item.image ? { uri: item.image } : defaultImage}
                  className="w-16 h-16 mb-2"
                  resizeMode="contain"
                />
                <Text className="text-xs text-center text-gray-700 mb-1 font-bold">
                  {item.nome}
                </Text>
                <Text className="text-green-600 font-bold text-xl">
                  R$ {item.price.toFixed(2)}
                </Text>
              </View>
            )}
          />
        )}

        {/* Lojas Dinâmicas */}
        <Text className="text-base font-semibold mb-3 text-gray-800">Lojas</Text>
        <View className="space-y-4 mb-6">
          {vendedores.length > 0 ? (
            vendedores.map((store: any, index: number) => (
              <View key={index} className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-3">
                  <Image
                    source={store.image ? { uri: store.image } : defaultStoreImage}
                    className="w-12 h-12 rounded-full"
                  />
                  <Text className="text-lg font-semibold text-gray-700">{store.nomeNegocio}</Text>
                </View>
                <Ionicons name="star-outline" size={20} color="#22c55e" />
              </View>
            ))
          ) : (
            <Text className="text-gray-500">Nenhuma loja encontrada.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
