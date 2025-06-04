import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Image
        source={require('../assets/logo.jpg')} // ou use uma imagem do expo
        className="w-48 h-48 mb-6"
        resizeMode="contain"
      />

      <Text className="w-full text-gray-700 mb-1">E-mail</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        className="w-full bg-gray-200 p-3 rounded mb-3"
      />

      <Text className="w-full text-gray-700 mb-1">Senha</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        className="w-full bg-gray-200 p-3 rounded mb-2"
      />

      <TouchableOpacity className="self-end mb-4">
        <Text className="text-green-600 text-sm">Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(drawer)/(tabs)')}
      className="bg-green-600 w-1/2 py-3 rounded mb-4">
        <Text className="text-white text-center font-bold">ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/register-option')}>
        <Text className="text-green-700 underline">Ainda não possui cadastro? Pressione aqui</Text>
      </TouchableOpacity>
    </View>
  );
}
