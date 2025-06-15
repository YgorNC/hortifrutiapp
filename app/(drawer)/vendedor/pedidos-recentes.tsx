import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

type Pedido = {
  id: string;
  cliente: string;
  data: string;
  valor: number;
  status: 'pendente' | 'entregue' | 'cancelado';
  itens: { nome: string; quantidade: number; valor: number }[];
};

export default function PedidosRecentesScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [filtroAtual, setFiltroAtual] = useState<'todos' | 'pendentes' | 'entregues'>('todos');

  const pedidos: Pedido[] = [
    {
      id: '1245',
      cliente: 'João Silva',
      data: '15/03/2024',
      valor: 47.00,
      status: 'pendente',
      itens: [
        { nome: 'Alface', quantidade: 2, valor: 8.00 },
        { nome: 'Tomate', quantidade: 3, valor: 15.00 },
        { nome: 'Cenoura', quantidade: 1, valor: 4.00 },
      ],
    },
    {
      id: '1246',
      cliente: 'Maria Oliveira',
      data: '15/03/2024',
      valor: 32.50,
      status: 'entregue',
      itens: [
        { nome: 'Repolho', quantidade: 1, valor: 6.50 },
        { nome: 'Batata', quantidade: 2, valor: 12.00 },
        { nome: 'Cebola', quantidade: 1, valor: 4.00 },
      ],
    },
    {
      id: '1247',
      cliente: 'Pedro Santos',
      data: '14/03/2024',
      valor: 28.75,
      status: 'entregue',
      itens: [
        { nome: 'Alface', quantidade: 1, valor: 4.00 },
        { nome: 'Tomate', quantidade: 2, valor: 10.00 },
        { nome: 'Cenoura', quantidade: 1, valor: 4.00 },
      ],
    },
  ];

  const pedidosFiltrados = pedidos.filter(pedido => {
    if (filtroAtual === 'todos') return true;
    if (filtroAtual === 'pendentes') return pedido.status === 'pendente';
    if (filtroAtual === 'entregues') return pedido.status === 'entregue';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente':
        return '#F59E0B';
      case 'entregue':
        return '#10B981';
      case 'cancelado':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'entregue':
        return 'Entregue';
      case 'cancelado':
        return 'Cancelado';
      default:
        return status;
    }
  };

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Pedidos Recentes</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtrosContainer}>
        <TouchableOpacity
          style={[styles.filtroBtn, filtroAtual === 'todos' && styles.filtroBtnActive]}
          onPress={() => setFiltroAtual('todos')}
        >
          <Text style={[styles.filtroText, filtroAtual === 'todos' && styles.filtroTextActive]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroBtn, filtroAtual === 'pendentes' && styles.filtroBtnActive]}
          onPress={() => setFiltroAtual('pendentes')}
        >
          <Text style={[styles.filtroText, filtroAtual === 'pendentes' && styles.filtroTextActive]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filtroBtn, filtroAtual === 'entregues' && styles.filtroBtnActive]}
          onPress={() => setFiltroAtual('entregues')}
        >
          <Text style={[styles.filtroText, filtroAtual === 'entregues' && styles.filtroTextActive]}>Entregues</Text>
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo</Text>
        <View style={styles.resumoGrid}>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Total de Pedidos</Text>
            <Text style={styles.resumoValue}>{pedidos.length}</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Pendentes</Text>
            <Text style={styles.resumoValue}>{pedidos.filter(p => p.status === 'pendente').length}</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Entregues</Text>
            <Text style={styles.resumoValue}>{pedidos.filter(p => p.status === 'entregue').length}</Text>
          </View>
          <View style={styles.resumoItem}>
            <Text style={styles.resumoLabel}>Valor Total</Text>
            <Text style={styles.resumoValue}>R$ {pedidos.reduce((acc, p) => acc + p.valor, 0).toFixed(2)}</Text>
          </View>
        </View>
      </View>

      {/* Lista de Pedidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pedidos</Text>
        {pedidosFiltrados.map((pedido) => (
          <View key={pedido.id} style={styles.pedidoCard}>
            <View style={styles.pedidoHeader}>
              <View>
                <Text style={styles.pedidoId}>Pedido #{pedido.id}</Text>
                <Text style={styles.pedidoCliente}>{pedido.cliente}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(pedido.status) }]}>
                <Text style={styles.statusText}>{getStatusText(pedido.status)}</Text>
              </View>
            </View>
            
            <View style={styles.pedidoInfo}>
              <Text style={styles.pedidoData}>{pedido.data}</Text>
              <Text style={styles.pedidoValor}>R$ {pedido.valor.toFixed(2)}</Text>
            </View>

            <View style={styles.itensContainer}>
              {pedido.itens.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemQtd}>{item.quantidade}x</Text>
                  <Text style={styles.itemValor}>R$ {item.valor.toFixed(2)}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.detalhesBtn}>
              <Text style={styles.detalhesText}>Ver Detalhes</Text>
              <Ionicons name="chevron-forward" size={16} color="#3B4B47" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 46,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
  },
  menuBtn: {
    marginRight: 12,
  },
  settingsBtn: {
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    padding: 8,
  },
  filtrosContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  filtroBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
  },
  filtroBtnActive: {
    backgroundColor: '#3B4B47',
  },
  filtroText: {
    color: '#3B4B47',
    fontSize: 13,
  },
  filtroTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#E3ECE8',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B4B47',
    marginBottom: 12,
  },
  resumoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resumoItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  resumoLabel: {
    fontSize: 13,
    color: '#3B4B47',
    marginBottom: 4,
  },
  resumoValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
  pedidoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  pedidoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pedidoId: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  pedidoCliente: {
    fontSize: 13,
    color: '#3B4B47',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  pedidoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pedidoData: {
    fontSize: 13,
    color: '#3B4B47',
  },
  pedidoValor: {
    fontSize: 14,
    color: '#3B4B47',
    fontWeight: '500',
  },
  itensContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E3ECE8',
    paddingTop: 8,
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemNome: {
    fontSize: 13,
    color: '#3B4B47',
    flex: 1,
  },
  itemQtd: {
    fontSize: 13,
    color: '#3B4B47',
    marginHorizontal: 8,
  },
  itemValor: {
    fontSize: 13,
    color: '#3B4B47',
    fontWeight: '500',
  },
  detalhesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E3ECE8',
  },
  detalhesText: {
    color: '#3B4B47',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 4,
  },
}); 