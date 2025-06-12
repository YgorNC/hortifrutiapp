import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus, Video as ExpoVideo } from 'expo-av';
import { useRouter, useFocusEffect } from 'expo-router';
import { supabase } from '../lib/supabase';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<ExpoVideo>(null); // ✅ Tipagem correta

  function validarEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }

    if (!validarEmail(email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        Alert.alert('Erro no login', error.message);
      } else {
        router.push('/(drawer)/(tabs)');
      }
    } catch (err) {
      Alert.alert('Erro', 'Algo deu errado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  // ✅ Garante que o vídeo toque ao focar e pare ao sair
  useFocusEffect(
    useCallback(() => {
      const playVideo = async () => {
        if (videoRef.current) {
          await videoRef.current.playAsync();
        }
      };
      playVideo();

      return () => {
        if (videoRef.current) {
          videoRef.current.stopAsync(); // para evitar que reinicie congelado
        }
      };
    }, [])
  );

  // ✅ Status de reprodução para pausar no último frame
  const handlePlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ('didJustFinish' in status && status.didJustFinish) {
      videoRef.current?.pauseAsync(); // mantém no último frame
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-6 mt-10">
        <Video
          ref={videoRef}
          source={require('../assets/logo-animado.mp4')}
          style={{ width: 192, height: 192, marginBottom: 24 }}
          resizeMode={ResizeMode.CONTAIN}
          isMuted
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />

        <Text className="w-full text-gray-700 mb-1">E-mail</Text>
        <TextInput
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          className="w-full bg-gray-200 p-3 rounded mb-3"
        />

        <Text className="w-full text-gray-700 mb-1">Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="w-full bg-gray-200 p-3 rounded mb-2"
        />

        <TouchableOpacity
          className="self-end mb-4"
          onPress={() => router.push('/password-recovery')}
        >
          <Text className="text-green-600 text-sm">Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`bg-green-600 w-1/2 py-3 rounded mb-4 ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-bold">ENTRAR</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/register-option')}>
          <Text className="text-green-700 underline">
            Ainda não possui cadastro? Pressione aqui
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
