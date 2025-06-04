import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function RegisterBuyer() {
  const router = useRouter();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-12 gap-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View className='flex gap-4 '>
        <Text className="text-center font-extrabold mb-7 font">
          PREENCHA OS CAMPOS PARA CRIAR SUA CONTA
        </Text>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Nome</Text>
          <TextInput placeholder="Digite seu nome" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Data de nascimento</Text>
          <TextInput placeholder="dd/mm/yyyy" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Informe seu e-mail</Text>
          <TextInput placeholder="email@email.com" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Confirme seu e-mail</Text>
          <TextInput placeholder="email@email.com" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Defina uma senha de acesso</Text>
          <TextInput placeholder="Digite sua senha" secureTextEntry className="bg-gray-200 p-3 rounded" />
        </View>
      </View>


      <View className="flex-row items-center space-x-2 mb-2 gap-2 top-5">
        <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
        <Text className="text-sm">
          Li e concordo com os{' '}
          <Text className="text-blue-600 underline">termos de uso</Text> e{' '}
          <Text className="text-blue-600 underline">políticas da [nome do app]</Text>.
        </Text>
      </View>

      <View className="flex-row items-center space-x-2 mb-4 gap-2 top-5">
        <Checkbox value={receiveOffers} onValueChange={setReceiveOffers} />
        <Text className="text-sm">
          Desejo receber ofertas e avisos de campanhas em meu e-mail.
        </Text>
      </View>
      <View className='flex items-center top-10'>
        <TouchableOpacity 
        onPress={() => router.push('/login')}
        className=" bg-gray-300 w-4/6 py-3 rounded mb-4 items-center">
          <Text className="text-center font-bold">CRIAR CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text className="text-green-700 underline text-center text-sm">
            Já possui conta? Entrar
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}
