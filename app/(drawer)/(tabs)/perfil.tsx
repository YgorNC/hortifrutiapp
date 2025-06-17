import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Perfil() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataJson = await AsyncStorage.getItem('userData');
        const userData = JSON.parse(userDataJson || '{}');
        const id = userData?.id;

        if (!id) {
          Alert.alert('Erro', 'ID do usuário não encontrado.');
          return;
        }

        setUserId(id);

        const response = await fetch(`https://nova-pasta-orpin.vercel.app/api/users/${id}`);

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        setNome(data.name || '');
        setCep(data.cep || '');
        setEndereco(data.endereco || '');
        setTelefone(data.phone || '');
        setEmail(data.email || '');
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
      }
    };

    fetchUserData();
  }, []);

  const atualizarDados = async () => {
    try {
      if (!userId) {
        Alert.alert('Erro', 'ID do usuário não encontrado.');
        return;
      }

      const response = await fetch(`https://nova-pasta-orpin.vercel.app/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          cep,
          endereco,
          phone: telefone,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na atualização: ${response.status}`);
      }

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
      keyboardVerticalOffset={90}
    >
      <ScrollView
        className="flex-1 px-4 pt-16"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Cabeçalho */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="#111827" />
          </TouchableOpacity>
          <Text className="flex-1 text-center text-2xl font-bold text-gray-800">
            Meu Perfil
          </Text>
          <View className="w-8" />
        </View>

        {/* Avatar + Nome */}
        <View className="items-center mb-8">
          <View className="w-28 h-28 rounded-full border-2 border-green-500 items-center justify-center bg-gray-100 shadow-md">
            <Ionicons name="person" size={64} color="#374151" />
          </View>
          <Text className="mt-3 text-2xl font-extrabold text-gray-800">{nome}</Text>
          <TouchableOpacity className="flex-row items-center mt-1">
            <Feather name="camera" size={18} color="#6B7280" />
            <Text className="ml-1 text-sm text-gray-600">Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Informações */}
        <View className="bg-gray-50 rounded-2xl shadow-lg px-6 py-6 mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Informações Pessoais</Text>

          {/* Campo: Nome */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Nome</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <Feather name="user" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-800 p-0"
                value={nome}
                onChangeText={setNome}
                placeholder="Digite seu nome"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Campo: CEP */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">CEP</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <Feather name="map-pin" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-800 p-0"
                value={cep}
                onChangeText={setCep}
                placeholder="12345-678"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Campo: Endereço */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Endereço</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <Feather name="home" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-800 p-0"
                value={endereco}
                onChangeText={setEndereco}
                placeholder="Rua das Flores, 123"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Campo: Telefone */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">Telefone</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <Feather name="phone" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-800 p-0"
                value={telefone}
                onChangeText={setTelefone}
                placeholder="(11) 91234-5678"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Campo: Email */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
              <Feather name="mail" size={18} color="#6B7280" />
              <TextInput
                className="flex-1 ml-3 text-sm text-gray-800 p-0"
                value={email}
                onChangeText={setEmail}
                placeholder="seu-email@exemplo.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
              />
            </View>
          </View>

          {/* Botão: Atualizar Dados */}
          <TouchableOpacity
            onPress={atualizarDados}
            className="bg-green-600 py-3 rounded-full items-center mb-2 shadow-md"
          >
            <Text className="text-white font-semibold text-base">Atualizar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity
          onPress={() => {
            router.replace('/');
          }}
          className="bg-green-600 py-3 rounded-full items-center shadow-lg mb-6 mx-8"
        >
          <Text className="text-white font-semibold text-base">Sair da conta</Text>
        </TouchableOpacity>

        <View className="h-16" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
