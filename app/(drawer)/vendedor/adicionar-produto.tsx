import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AdicionarProdutoScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [vendedorId, setVendedorId] = useState('');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const [produtosRecentes, setProdutosRecentes] = useState([]);

  useEffect(() => {
    const loadVendedorIdAndProdutos = async () => {
      try {
        const dataJson = await AsyncStorage.getItem('userData');
        if (dataJson) {
          const data = JSON.parse(dataJson);
          if (data?.tipo === 'vendedor') {
            const id = data.id.toString();
            setVendedorId(id);
            await buscarProdutos(id);
          } else {
            setFeedback({ type: 'error', message: 'Usuário não é um vendedor.' });
          }
        } else {
          setFeedback({ type: 'error', message: 'Dados do vendedor não encontrados.' });
        }
      } catch (err) {
        setFeedback({ type: 'error', message: 'Erro ao carregar dados do vendedor.' });
      }
    };

    loadVendedorIdAndProdutos();
  }, []);

  const buscarProdutos = async (vendedorId: any) => {
  try {
    const response = await fetch(`https://nova-pasta-orpin.vercel.app/api/products?vendedorId=${vendedorId}`);
    const result = await response.json();

    if (response.ok) {
      setProdutosRecentes(result.data || []);
    } else {
      console.error('Erro na resposta:', result.message);
    }
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
  }
};


  const handleSubmit = async () => {
    if (!nome || !quantidade || !image || !price || !vendedorId) {
      setFeedback({ type: 'error', message: 'Preencha todos os campos.' });
      return;
    }

    setLoading(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await fetch('https://nova-pasta-orpin.vercel.app/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          quantidade: Number(quantidade),
          image,
          price: Number(price),
          vendedorId: Number(vendedorId),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedback({ type: 'success', message: 'Produto cadastrado com sucesso!' });
        setNome('');
        setQuantidade('');
        setImage('');
        setPrice('');
        await buscarProdutos(vendedorId);
        setTimeout(() => {
          router.replace('/(drawer)/vendedor/(tabs)/vendedor-home');
        }, 1500);
      } else {
        setFeedback({ type: 'error', message: result.message || 'Erro ao adicionar produto.' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Erro ao conectar com o servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace('/(drawer)/vendedor/(tabs)/vendedor-home')}
        >
          <Text style={styles.backText}>{'< Voltar'}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Adicionar Produto</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Nome do Produto"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="Quantidade"
            style={styles.input}
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <TextInput
            placeholder="URL da Imagem"
            style={styles.input}
            value={image}
            onChangeText={setImage}
          />
          <TextInput
            placeholder="Preço (ex: 19.90)"
            style={styles.input}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />

          <TouchableOpacity style={styles.btn} onPress={handleSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Cadastrar Produto</Text>
            )}
          </TouchableOpacity>

          {feedback.message.length > 0 && (
            <Text
              style={[
                styles.feedbackText,
                feedback.type === 'success' ? styles.success : styles.error,
              ]}
            >
              {feedback.message}
            </Text>
          )}
        </View>

        {produtosRecentes.length > 0 && (
          <View style={styles.recentesContainer}>
            <Text style={styles.recentesTitulo}>Produtos adicionados recentemente:</Text>
            {produtosRecentes.map((produto) => (
              <View key={produto.id} style={styles.produtoItem}>
                {produto.image ? (
                  <Image source={{ uri: produto.image }} style={styles.imagePreview} />
                ) : (
                  <View style={styles.imagePreview}>
                    <Text style={{ color: '#555' }}>🖼️</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={styles.produtoNome}>{produto.nome}</Text>
                  <Text style={styles.produtoPreco}>R$ {produto.price?.toFixed(2)}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
  },
  backText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 14,
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  success: {
    color: '#16a34a',
  },
  error: {
    color: '#dc2626',
  },
  recentesContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    width: '100%',
  },
  recentesTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  produtoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  imagePreview: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  produtoNome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  produtoPreco: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 2,
  },
});
