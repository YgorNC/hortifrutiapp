import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function RegisterSeller() {
  const router = useRouter();

  const [noNumber, setNoNumber] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-12 gap-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="gap-3">
        <Text className="text-center font-extrabold mb-7">
          PREENCHA OS CAMPOS PARA CRIAR SUA CONTA
        </Text>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Nome do seu negócio*</Text>
          <TextInput placeholder="Digite o nome do seu negócio" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Informe o CNPJ*</Text>
          <TextInput placeholder="00.000.000/0000-00" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Informe seu e-mail*</Text>
          <TextInput placeholder="email@email.com" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Confirme seu e-mail*</Text>
          <TextInput placeholder="email@email.com" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">CEP*</Text>
          <TextInput placeholder="00000-000" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Logradouro*</Text>
          <TextInput placeholder="Digite o logradouro" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="flex-row items-center mb-3 space-x-3">
          <View className="flex-1">
            <Text className="mb-1 font-bold text-sm">Número*</Text>
            <TextInput placeholder="000" className="bg-gray-200 p-3 rounded" />
          </View>
          <View className="flex-row items-center">
            <Checkbox value={noNumber} onValueChange={setNoNumber} />
            <Text className="ml-2 text-sm">Não tem número.</Text>
          </View>
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Complemento</Text>
          <TextInput placeholder="Ex: Próximo à esquina..." className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Contato*</Text>
          <TextInput placeholder="(00) 00000-0000" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Unidade Federativa</Text>
          <TextInput placeholder="Selecione" className="bg-gray-200 p-3 rounded" />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Defina uma senha de acesso</Text>
          <TextInput placeholder="Digite sua senha" secureTextEntry className="bg-gray-200 p-3 rounded" />
        </View>
      </View>

      <View className="flex-row items-center gap-2 top-5">
        <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
        <Text className="text-sm">
          Li e concordo com os{' '}
          <Text className="text-blue-600 underline">termos de uso</Text> e{' '}
          <Text className="text-blue-600 underline">políticas da [nome do app]</Text>.
        </Text>
      </View>

      <View className="flex-row items-center gap-2 top-7 mb-4">
        <Checkbox value={receiveOffers} onValueChange={setReceiveOffers} />
        <Text className="text-sm">
          Desejo receber ofertas e avisos de campanhas em meu e-mail.
        </Text>
      </View>

      <View className="flex items-center top-10 ">
        <TouchableOpacity className="bg-gray-300 w-4/6 py-3 rounded mb-4 items-center">
          <Text className="font-bold">CRIAR CONTA</Text>
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
