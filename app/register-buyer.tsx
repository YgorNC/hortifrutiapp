import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function RegisterBuyer() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  function formatarData(value: string) {
    const apenasNumeros = value.replace(/\D/g, '');
    let formatted = '';
    if (apenasNumeros.length <= 2) {
      formatted = apenasNumeros;
    } else if (apenasNumeros.length <= 4) {
      formatted = apenasNumeros.slice(0, 2) + '/' + apenasNumeros.slice(2);
    } else {
      formatted =
        apenasNumeros.slice(0, 2) +
        '/' +
        apenasNumeros.slice(2, 4) +
        '/' +
        apenasNumeros.slice(4, 8);
    }
    return formatted;
  }

  function formatarTelefone(value: string) {
    const apenasNumeros = value.replace(/\D/g, '');
    let formatted = '';

    if (apenasNumeros.length <= 2) {
      formatted = `(${apenasNumeros}`;
    } else if (apenasNumeros.length <= 6) {
      formatted = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    } else if (apenasNumeros.length <= 10) {
      formatted = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
    } else {
      formatted = `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
    }

    return formatted;
  }

  function converterDataParaISO(dataPtBr: string) {
    const partes = dataPtBr.split('/');
    if (partes.length !== 3) return null;
    const [dia, mes, ano] = partes;
    if (!/^\d{2}$/.test(dia) || !/^\d{2}$/.test(mes) || !/^\d{4}$/.test(ano)) {
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

    const nascimento = converterDataParaISO(birthDate);
    if (!nascimento) {
      Alert.alert('Erro', 'Data de nascimento inválida. Use o formato dd/mm/yyyy.');
      return;
    }

    try {
      const response = await fetch('https://nova-pasta-orpin.vercel.app/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          nascimento,
          senha: password,
          email,
          phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro ao cadastrar', data?.message || 'Erro inesperado');
        return;
      }

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('/login');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível se conectar ao servidor.');
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-20 gap-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="flex gap-4">
        <Text className="text-center font-extrabold mb-7">
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
          <Text className="mb-1 font-bold text-sm">Telefone</Text>
          <TextInput
            placeholder="(99) 99999-9999"
            className="bg-gray-200 p-3 rounded"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => setPhone(formatarTelefone(text))}
            maxLength={15}
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
