import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterOption() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white px-6 pt-20 ">
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View className='flex-auto justify-center '>
                <Text className="text-center font-bold text-lg mb-2">CRIAR CONTA</Text>
                <Text className="text-center text-gray-700 mb-6">
                    Ficamos muito felizes em saber que deseja fazer parte dessa história!
                </Text>
                <View className="flex items-center">
                    <Image
                        source={require('../assets/logo.jpg')}
                        className="w-48 h-48 mb-6 "
                        resizeMode="contain"
                    />
                </View>

                <Text className="text-center text-gray-700 mb-6">
                    Abaixo, escolha um tipo de conta que deseja criar:
                </Text>

                <View className="flex flex-col items-center mb-6">
                    <TouchableOpacity
                        onPress={() => router.push('/register-buyer')}
                        className="  bg-orange-600 py-3 w-4/6 rounded mb-4 items-center"
                    >
                        <Text className="text-white text-center font-bold">QUERO COMPRAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/register-seller')}
                        className="bg-green-600 w-4/6 py-3 rounded"
                    >
                        <Text className="text-white text-center font-bold">QUERO VENDER</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity className="mt-6" onPress={() => router.push('/login')}>
                    <Text className="text-green-700 underline text-center">Já possui conta? Entrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
