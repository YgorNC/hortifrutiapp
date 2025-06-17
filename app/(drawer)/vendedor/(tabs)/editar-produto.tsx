import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarProdutoScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Tenta extrair o produto da rota, de forma segura
  const produto = (route.params as { produto?: any })?.produto;

  // Verifica se o produto existe ao carregar a tela
  useEffect(() => {
    if (!produto) {
      Alert.alert('Erro', 'Produto não encontrado.');
      navigation.goBack();
    }
  }, []);

  const [nome, setNome] = useState(produto?.nome || '');
  const [preco, setPreco] = useState(produto?.price ? String(produto.price) : '');
  const [quantidade, setQuantidade] = useState(produto?.quantidade ? String(produto.quantidade) : '');
  const [loading, setLoading] = useState(false);

  const baseUrl =
    'https://nova-pasta-orpin.vercel.app/api';

  const handleSalvar = async () => {
    if (!nome || !preco || !quantidade) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const precoNum = Number(preco);
    const quantidadeNum = Number(quantidade);

    if (isNaN(precoNum) || isNaN(quantidadeNum)) {
      Alert.alert('Erro', 'Preço e quantidade devem ser números válidos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/products/${produto.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          price: precoNum,
          quantidade: quantidadeNum,
          vendedorId: produto.vendedorId, // Mantém o vendedorId
          image: produto.image, // Mantém a imagem
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Produto atualizado com sucesso!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('Erro', 'Falha ao atualizar o produto.');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      Alert.alert('Erro', 'Erro ao atualizar o produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <Text style={styles.title}>Editar Produto</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do produto"
      />

      <Text style={styles.label}>Preço (R$)</Text>
      <TextInput
        style={styles.input}
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        placeholder="Preço"
      />

      <Text style={styles.label}>Quantidade (kg)</Text>
      <TextInput
        style={styles.input}
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        placeholder="Quantidade"
      />

      <TouchableOpacity
        onPress={handleSalvar}
        style={[styles.button, loading && { opacity: 0.6 }]}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B4B47',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: '#3B4B47',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#3B4B47',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3DC16B',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
});
