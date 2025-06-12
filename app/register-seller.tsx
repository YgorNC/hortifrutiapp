import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function RegisterSeller() {
  const router = useRouter();

  const [noNumber, setNoNumber] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  // Campos do formulário
  const [businessName, setBusinessName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [contato, setContato] = useState('');
  const [uf, setUf] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = async () => {
    if (!agreeTerms) {
      Alert.alert('Atenção', 'Você deve aceitar os termos de uso.');
      return;
    }

    if (email !== confirmEmail) {
      Alert.alert('Erro', 'Os e-mails não coincidem.');
      return;
    }

    const { error } = await supabase.from('sellers').insert([{
      business_name: businessName,
      cnpj,
      email,
      cep,
      logradouro,
      numero: noNumber ? null : numero,
      complemento,
      contato,
      uf,
      senha, // ⚠️ em produção, nunca salve a senha em texto puro!
      receive_offers: receiveOffers,
      created_at: new Date()
    }]);

    if (error) {
      Alert.alert('Erro ao criar conta', error.message);
    } else {
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/(drawer)/vendedor/(tabs)/vendedor-home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 pt-7 gap-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-5">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="gap-3">
          <Text className="text-center font-extrabold mb-7">
            PREENCHA OS CAMPOS PARA CRIAR SUA CONTA
          </Text>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Nome do seu negócio*</Text>
            <TextInput
              placeholder="Digite o nome do seu negócio"
              className="bg-gray-200 p-3 rounded"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Informe o CNPJ*</Text>
            <TextInput
              placeholder="00.000.000/0000-00"
              className="bg-gray-200 p-3 rounded"
              value={cnpj}
              onChangeText={setCnpj}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Informe seu e-mail*</Text>
            <TextInput
              placeholder="email@email.com"
              className="bg-gray-200 p-3 rounded"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Confirme seu e-mail*</Text>
            <TextInput
              placeholder="email@email.com"
              className="bg-gray-200 p-3 rounded"
              value={confirmEmail}
              onChangeText={setConfirmEmail}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">CEP*</Text>
            <TextInput
              placeholder="00000-000"
              className="bg-gray-200 p-3 rounded"
              value={cep}
              onChangeText={setCep}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Logradouro*</Text>
            <TextInput
              placeholder="Digite o logradouro"
              className="bg-gray-200 p-3 rounded"
              value={logradouro}
              onChangeText={setLogradouro}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Número*</Text>
            <View className="flex-row items-center gap-4">
              <TextInput
                placeholder="000"
                className="bg-gray-200 p-3 rounded w-1/2"
                value={numero}
                onChangeText={setNumero}
                editable={!noNumber}
              />
              <View className="flex-row items-center">
                <Checkbox value={noNumber} onValueChange={setNoNumber} />
                <Text className="ml-2 text-sm">Não tem número.</Text>
              </View>
            </View>
          </View>


          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Complemento</Text>
            <TextInput
              placeholder="Ex: Próximo à esquina..."
              className="bg-gray-200 p-3 rounded"
              value={complemento}
              onChangeText={setComplemento}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Contato*</Text>
            <TextInput
              placeholder="(00) 00000-0000"
              className="bg-gray-200 p-3 rounded"
              value={contato}
              onChangeText={setContato}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Unidade Federativa</Text>
            <TextInput
              placeholder="UF"
              className="bg-gray-200 p-3 rounded"
              value={uf}
              onChangeText={setUf}
            />
          </View>

          <View className="mb-3">
            <Text className="mb-1 font-bold text-sm">Defina uma senha de acesso</Text>
            <TextInput
              placeholder="Digite sua senha"
              secureTextEntry
              className="bg-gray-200 p-3 rounded"
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        <View className="px-5 top-5">
          <View className="flex-row items-start gap-2">
            <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
            <Text className="text-sm flex-1">
              Li e concordo com os{' '}
              <Text className="text-blue-600 underline">termos de uso</Text> e{' '}
              <Text className="text-blue-600 underline">políticas da HortifrutiApp</Text>.
            </Text>
          </View>
        </View>

        <View className="px-5 top-7 mb-4">
          <View className="flex-row items-start gap-2">
            <Checkbox value={receiveOffers} onValueChange={setReceiveOffers} />
            <Text className="text-sm flex-1">
              Desejo receber ofertas e avisos de campanhas em meu e-mail.
            </Text>
          </View>
        </View>


        <View className="flex items-center top-10 ">
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-gray-300 w-4/6 py-3 rounded mb-4 items-center"
          >
            <Text className="font-bold">CRIAR CONTA</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-green-700 underline text-center text-sm">
              Já possui conta? Entrar
            </Text>
          </TouchableOpacity>
          <View className='flex-1 h-20'></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
