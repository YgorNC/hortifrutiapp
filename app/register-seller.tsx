import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

export default function RegisterSeller() {
  const router = useRouter();

  const [nomeNegocio, setNomeNegocio] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [contato, setContato] = useState('');

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [receiveOffers, setReceiveOffers] = useState(false);

  const handleRegister = async () => {
    if (
      !nomeNegocio ||
      !cnpj ||
      !email ||
      !senha ||
      !cep ||
      !logradouro ||
      !numero ||
      !contato
    ) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch(
        'https://nova-pasta-orpin.vercel.app/api/vendedor/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nomeNegocio,
            cnpj,
            email,
            senha,
            cep,
            logradouro,
            numero,
            complemento: complemento || null,
            contato,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Erro', data.message || 'Erro ao criar conta.');
        return;
      }

      if (!data) {
        console.error('Register: data.data veio undefined ou null:', data);
        Alert.alert('Erro', 'Resposta inesperada do servidor.');
        return;
      }

      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.push('/login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 pt-7 gap-4">
        <TouchableOpacity onPress={() => router.back()} className="mb-5">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-center font-extrabold mb-7">
          CADASTRO DE VENDEDOR
        </Text>

        {/* campos de input */}
        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Nome do negócio*</Text>
          <TextInput
            placeholder="Nome da empresa"
            className="bg-gray-200 p-3 rounded"
            value={nomeNegocio}
            onChangeText={setNomeNegocio}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">CNPJ*</Text>
          <TextInput
            placeholder="00.000.000/0000-00"
            className="bg-gray-200 p-3 rounded"
            value={cnpj}
            onChangeText={setCnpj}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">E-mail*</Text>
          <TextInput
            placeholder="email@exemplo.com"
            className="bg-gray-200 p-3 rounded"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Senha*</Text>
          <TextInput
            placeholder="Senha segura"
            className="bg-gray-200 p-3 rounded"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
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
            placeholder="Rua, avenida..."
            className="bg-gray-200 p-3 rounded"
            value={logradouro}
            onChangeText={setLogradouro}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Número*</Text>
          <TextInput
            placeholder="Número"
            className="bg-gray-200 p-3 rounded"
            value={numero}
            onChangeText={setNumero}
          />
        </View>

        <View className="mb-3">
          <Text className="mb-1 font-bold text-sm">Complemento</Text>
          <TextInput
            placeholder="Opcional"
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
            keyboardType="phone-pad"
          />
        </View>

        {/* Checkboxes visuais */}
        <View className="px-5 mt-4">
          <View className="flex-row items-start gap-2 mb-2">
            <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
            <Text className="text-sm flex-1">
              Li e concordo com os{' '}
              <Text className="text-blue-600 underline">termos de uso</Text> e{' '}
              <Text className="text-blue-600 underline">
                políticas da HortifrutiApp
              </Text>.
            </Text>
          </View>

          <View className="flex-row items-start gap-2">
            <Checkbox value={receiveOffers} onValueChange={setReceiveOffers} />
            <Text className="text-sm flex-1">
              Desejo receber ofertas e avisos de campanhas por e-mail.
            </Text>
          </View>
        </View>

        <View className="flex items-center mt-7 mb-10">
          <TouchableOpacity
            onPress={handleRegister}
            className="bg-green-600 w-4/6 py-3 rounded mb-4 items-center"
          >
            <Text className="text-white font-bold">CRIAR CONTA</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="text-green-700 underline text-sm">
              Já possui conta? Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
