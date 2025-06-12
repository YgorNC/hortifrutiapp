import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../lib/supabase'; // ajuste caminho se necessário

export default function RecuperarSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleEnviarLink() {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o e-mail cadastrado.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'exp://seu-app-url/confirmar-nova-senha', // link que abre seu app para resetar senha
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert(
        'Sucesso',
        'Se o e-mail estiver cadastrado, um link para redefinição de senha foi enviado.'
      );
      router.push('/login');
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 20, paddingTop: 60 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ color: '#222', fontSize: 16 }}>Voltar</Text>
      </TouchableOpacity>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>RECUPERAR SENHA</Text>
        <Text style={{ color: '#222', textAlign: 'center', marginBottom: 18 }}>
          Informe seu e-mail cadastro para receber um link de redefinição de senha.
        </Text>
        <TextInput
          style={{ backgroundColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, width: '100%', marginBottom: 12 }}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity
          onPress={handleEnviarLink}
          disabled={loading}
          style={{
            backgroundColor: loading ? '#999' : '#4caf50',
            borderRadius: 6,
            paddingVertical: 14,
            width: '80%',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>
            {loading ? 'Enviando...' : 'ENVIAR LINK'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
