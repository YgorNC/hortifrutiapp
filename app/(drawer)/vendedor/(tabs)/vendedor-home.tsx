import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VendedorHomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [loading, setLoading] = useState(true);
  const [vendedorData, setVendedorData] = useState<any>(null);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [pedidos, setPedidos] = useState<any[]>([]);

  const baseUrl = 'https://nova-pasta-orpin.vercel.app/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;

        if (!userData || userData.tipo !== 'vendedor') {
          navigation.navigate('Login');
          return;
        }

        const response = await fetch(`${baseUrl}/products/vendedor/${userData.id}`);
        const text = await response.text();
        try {
          const vendedorJson = JSON.parse(text);
          if (response.ok && vendedorJson) setVendedorData(vendedorJson);
        } catch (err) {
          console.error('Erro ao parsear JSON:', err);
        }

        const produtosResponse = await fetch(`${baseUrl}/products/${userData.id}`);
        const produtosJson = await produtosResponse.json();
        if (produtosResponse.ok && Array.isArray(produtosJson.data)) {
          setProdutos(produtosJson.data);
        }

        const pedidosResponse = await fetch(`${baseUrl}/vendedor/${userData.id}/pedidos`);
        const pedidosJson = await pedidosResponse.json();
        if (pedidosResponse.ok && Array.isArray(pedidosJson.data)) {
          setPedidos(pedidosJson.data);
        }
        if (pedidosJson.data.length === 0) {
          Alert.alert('Nenhum pedido encontrado', 'Você ainda não tem pedidos.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation]);

  const handleAdicionarProduto = () => {
    navigation.navigate('adicionar-produto');
  };

  const handleEditarProduto = (produto: string) => {
    navigation.navigate('editar-produto', { produto });
  };

  const handleRemoverProduto = async (produtoId: string) => {
    Alert.alert('Remover Produto', 'Tem certeza que deseja remover este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(`${baseUrl}/products/${produtoId}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              setProdutos(produtos.filter((p) => p.id !== produtoId));
            } else {
              Alert.alert('Erro', 'Não foi possível remover o produto.');
            }
          } catch (error) {
            console.error('Erro ao remover produto:', error);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3DC16B" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.hello}>Olá, {vendedorData?.nomeNegocio || 'Vendedor'}!</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Painel de Desempenho</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Pedidos</Text>
            <Text style={styles.metricValue}>{pedidos.length}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Total Vendido</Text>
            <Text style={styles.metricValue}>R$ {pedidos.reduce((t, p) => t + (p?.valorTotal || 0), 0).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{vendedorData?.nomeNegocio || 'Estabelecimento'}</Text>
        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Online</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.produtosHeader}>
          <Text style={styles.cardTitle}>Seus Produtos</Text>
          <TouchableOpacity onPress={handleAdicionarProduto}>
            <Ionicons name="add-circle-outline" size={24} color="#3DC16B" />
          </TouchableOpacity>
        </View>
        {produtos.length > 0 ? (
          produtos.map((produto, index) => (
            <View key={index} style={styles.produtoRow}>
              <View style={styles.produtoInfo}>
                <Text style={styles.produtoNome}>{produto.nome}</Text>
                <Text style={styles.produtoPreco}>R$ {produto.price}</Text>
                <Text style={styles.produtoQtd}>{produto.quantidade} kg</Text>
              </View>
              <View style={styles.produtoActions}>
                <TouchableOpacity onPress={() => handleEditarProduto(produto)}>
                  <Ionicons name="create-outline" size={20} color="#3B4B47" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoverProduto(produto.id)}>
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pedidos Recentes</Text>
        {pedidos.length > 0 ? (
          pedidos.slice(0, 5).map((pedido, index) => (
            <View key={index} style={styles.pedidoItem}>
              <Text style={styles.pedidoId}>Pedido #{pedido.id}</Text>
              <Text style={styles.pedidoCliente}>{pedido.clienteNome}</Text>
              <Text style={styles.pedidoValor}>R$ {pedido?.valorTotal?.toFixed(2) || '0.00'}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhum pedido recente.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9', marginTop: 35 },
  scrollContainer: { padding: 16, paddingBottom: 32 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hello: { fontSize: 22, fontWeight: '600', color: '#333' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontWeight: 'bold', fontSize: 18, color: '#333', marginBottom: 12 },
  metricsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  metricBox: { flex: 1 },
  metricLabel: { fontSize: 14, color: '#666' },
  metricValue: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3DC16B',
    marginRight: 6,
  },
  statusText: { color: '#3DC16B', fontWeight: '600' },
  produtosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  produtoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  produtoInfo: {},
  produtoNome: { fontSize: 16, fontWeight: '500' },
  produtoPreco: { fontSize: 14, color: '#555' },
  produtoQtd: { fontSize: 14, color: '#888' },
  produtoActions: { flexDirection: 'row', gap: 12 },
  emptyText: { color: '#999', textAlign: 'center', marginTop: 8 },
  pedidoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  pedidoId: { fontWeight: 'bold', fontSize: 15 },
  pedidoCliente: { color: '#444' },
  pedidoValor: { color: '#3DC16B', fontWeight: 'bold' },
});