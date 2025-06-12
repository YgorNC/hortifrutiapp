import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SucessoSenhaScreen() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5); // contador de 5 segundos

  useEffect(() => {
    if (countdown === 0) {
      router.replace('/login');
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 24, textAlign: 'center', color: '#111' }}>
        SENHA ALTERADA COM SUCESSO!
      </Text>

      <View
        style={{
          borderWidth: 5,
          borderColor: '#22d3ee',
          borderRadius: 100,
          width: 140,
          height: 140,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 40,
          backgroundColor: '#e0f7fa',
          shadowColor: '#22d3ee',
          shadowOpacity: 0.6,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 4 },
          elevation: 10,
        }}
      >
        <Ionicons name="checkmark" size={72} color="#22d3ee" />
      </View>

      <Text style={{ fontSize: 14, color: '#666', marginBottom: 16, textAlign: 'center' }}>
        Você será redirecionado automaticamente para a tela de login em {countdown} segundo{countdown !== 1 ? 's' : ''}.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#22d3ee',
          borderRadius: 8,
          paddingVertical: 16,
          paddingHorizontal: 40,
          marginBottom: 20,
          width: '80%',
          alignItems: 'center',
          shadowColor: '#22d3ee',
          shadowOpacity: 0.5,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 6,
        }}
        onPress={() => router.replace('/login')}
        activeOpacity={0.8}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
}
