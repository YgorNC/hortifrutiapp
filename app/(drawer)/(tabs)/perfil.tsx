import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Perfil() {
  const router = useRouter();

  const [nome, setNome] = useState('João Silva');
  const [cep, setCep] = useState('12345-678');
  const [endereco, setEndereco] = useState('Rua das Flores, 123');
  const [telefone, setTelefone] = useState('(11) 91234-5678');
  const [email, setEmail] = useState('joao@email.com');

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
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 focus-within:border-green-500 px-4 py-3 shadow-sm">
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
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 focus-within:border-green-500 px-4 py-3 shadow-sm">
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
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 focus-within:border-green-500 px-4 py-3 shadow-sm">
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
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 focus-within:border-green-500 px-4 py-3 shadow-sm">
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
            <View className="flex-row items-center bg-white rounded-xl border border-gray-200 focus-within:border-green-500 px-4 py-3 shadow-sm">
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

          {/* Botão: Atualizar Dados (exemplo extra) */}
          <TouchableOpacity
            onPress={() => {
              // Aqui você poderia salvar as alterações
            }}
            className="bg-green-600 py-3 rounded-full items-center mb-2 shadow-md"
          >
            <Text className="text-white font-semibold text-base">Atualizar</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity
          onPress={() => {
            // Lógica de logout
            router.replace('/');
          }}
          className="bg-green-600 py-3 rounded-full items-center shadow-lg mb-6 mx-8"
        >
          <Text className="text-white font-semibold text-base">Sair da conta</Text>
        </TouchableOpacity>

        {/* Espaço extra para “respiro” */}
        <View className="h-16" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
