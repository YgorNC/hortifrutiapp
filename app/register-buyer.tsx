import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RegisterBuyer() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  // Função para formatar data enquanto digita (dd/MM/yyyy)
  function formatarData(value: string) {
    // Remove tudo que não for número
    const apenasNumeros = value.replace(/\D/g, '');

    let formatted = '';

    if (apenasNumeros.length <= 2) {
      formatted = apenasNumeros;
    } else if (apenasNumeros.length <= 4) {
      formatted = apenasNumeros.slice(0, 2) + '/' + apenasNumeros.slice(2);
    } else if (apenasNumeros.length <= 8) {
      formatted =
        apenasNumeros.slice(0, 2) +
        '/' +
        apenasNumeros.slice(2, 4) +
        '/' +
        apenasNumeros.slice(4, 8);
    } else {
      // Limita a 8 dígitos (ddMMyyyy)
      formatted =
        apenasNumeros.slice(0, 2) +
        '/' +
        apenasNumeros.slice(2, 4) +
        '/' +
        apenasNumeros.slice(4, 8);
    }

    return formatted;
  }

  // Função para converter data dd/MM/yyyy -> yyyy-MM-dd
  function converterDataParaISO(dataPtBr: string) {
    const partes = dataPtBr.split('/');
    if (partes.length !== 3) return null;
    const [dia, mes, ano] = partes;
    if (
      !/^\d{2}$/.test(dia) ||
      !/^\d{2}$/.test(mes) ||
      !/^\d{4}$/.test(ano)
    ) {
      return null;
    }
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  const handleRegisterBuyer = async () => {
    if (!agreeTerms) {
      Alert.alert('Atenção', 'Você precisa aceitar os termos de uso para continuar.');
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert('Erro', 'Os e-mails não coincidem.');
      return;
    }

    const birthDateISO = converterDataParaISO(birthDate);
    if (!birthDateISO) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato dd/mm/yyyy.');
      return;
    }

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      Alert.alert('Erro ao criar conta', signUpError.message);
      return;
    }

    const userId = authData.user?.id;

    if (!userId) {
      Alert.alert('Erro', 'Usuário não criado corretamente.');
      return;
    }

    const { error: insertError } = await supabase.from('buyers').insert({
      user_id: userId,
      name: name,
      birth_date: birthDateISO,
      receive_offers: receiveOffers,
    });

    if (insertError) {
      Alert.alert('Erro ao salvar dados adicionais', insertError.message);
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('/login');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-20 gap-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="flex gap-4">
        <Text className="text-center font-extrabold mb-7 font">
          PREENCHA OS CAMPOS PARA CRIAR SUA CONTA
        </Text>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Nome</Text>
          <TextInput
            placeholder="Digite seu nome"
            className="bg-gray-200 p-3 rounded"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Data de nascimento</Text>
          <TextInput
            placeholder="dd/mm/yyyy"
            className="bg-gray-200 p-3 rounded"
            value={birthDate}
            onChangeText={(text) => setBirthDate(formatarData(text))}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Informe seu e-mail</Text>
          <TextInput
            placeholder="email@email.com"
            className="bg-gray-200 p-3 rounded"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Confirme seu e-mail</Text>
          <TextInput
            placeholder="email@email.com"
            className="bg-gray-200 p-3 rounded"
            keyboardType="email-address"
            autoCapitalize="none"
            value={confirmEmail}
            onChangeText={setConfirmEmail}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Defina uma senha de acesso</Text>
          <TextInput
            placeholder="Digite sua senha"
            secureTextEntry
            className="bg-gray-200 p-3 rounded"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View className="px-5 top-5 mb-2">
        <View className="flex-row items-start gap-2">
          <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
          <Text className="text-sm flex-1">
            Li e concordo com os{' '}
            <Text className="text-blue-600 underline">termos de uso</Text> e{' '}
            <Text className="text-blue-600 underline">políticas da HortifrutiApp</Text>.
          </Text>
        </View>
      </View>

      <View className="px-5 top-5 mb-4">
        <View className="flex-row items-start gap-2">
          <Checkbox value={receiveOffers} onValueChange={setReceiveOffers} />
          <Text className="text-sm flex-1">
            Desejo receber ofertas e avisos de campanhas em meu e-mail.
          </Text>
        </View>
      </View>


      <View className="flex items-center top-10">
        <TouchableOpacity
          onPress={handleRegisterBuyer}
          className="bg-gray-300 w-4/6 py-3 rounded mb-4 items-center"
        >
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
