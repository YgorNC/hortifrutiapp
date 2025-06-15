import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

export default function VendedorHomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true; // Retorna true para impedir o comportamento padrão do botão voltar
    });

    return () => backHandler.remove(); // Limpa o listener quando o componente for desmontado
  }, []);

  const handleAdicionarProduto = () => {
    navigation.navigate('adcionar-produto');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.hello}>Olá, Vendedor!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('configuracoes')} style={styles.settingsBtn}>
          <Ionicons name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Painel de Desempenho */}
      <TouchableOpacity onPress={() => navigation.navigate('relatorio-desempenho')}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Painel de Desempenho</Text>
          <Ionicons name="chevron-forward" size={20} color="#3B4B47" />
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Pedidos realizados</Text>
            <Text style={styles.metricValue}>12</Text>
          </View>
          <View style={styles.metricCol}>
            <Text style={styles.metricLabel}>Valor vendido</Text>
            <Text style={styles.metricValue}>R$ 42,00</Text>
          </View>
        </View>
        <Text style={styles.metricLabel}>Produtos mais vendidos</Text>
        <Text style={styles.metricValue}>Alface, Tomate</Text>
        <View style={styles.chartTabsRow}>
          <Text style={styles.tabActive}>Dia</Text>
          <Text style={styles.tab}>Semana</Text>
          <Text style={styles.tab}>Mês</Text>
        </View>
        
        {/* Gráfico fake */}
        <View style={styles.chartBarRow}>
          <View style={[styles.chartBar, { height: 20 }]} />
          <View style={[styles.chartBar, { height: 35 }]} />
          <View style={[styles.chartBar, { height: 50 }]} />
          <View style={[styles.chartBar, { height: 30 }]} />
          <View style={[styles.chartBar, { height: 60 }]} />
        </View>
      </View>
      </TouchableOpacity>

      {/* Adicionar produto */}
      <TouchableOpacity onPress={handleAdicionarProduto}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>+ Adicionar produto</Text>
        <View style={styles.produtoRow}>
          <Text style={styles.produtoNome}>Cebola</Text>
          <Text style={styles.produtoPreco}>R$ 6,70</Text>
          <Text style={styles.produtoQtd}>25 und</Text>
        </View>
        <View style={styles.produtoRow}>
          <Text style={styles.produtoNome}>Repolho</Text>
          <Text style={styles.produtoPreco}>R$ 4,99</Text>
          <Text style={styles.produtoQtd}>8 und</Text>
        </View>
      </View>
      </TouchableOpacity>

      {/* Pedidos Recentes */}
      <TouchableOpacity onPress={() => navigation.navigate('pedidos-recentes')}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Pedidos Recentes</Text>
            <Ionicons name="chevron-forward" size={20} color="#3B4B47" />
          </View>
          <View style={styles.tabsRow}>
            <Text style={styles.tabActive}>Todos</Text>
            <Text style={styles.tab}>Pendentes</Text>
            <Text style={styles.tab}>Entregues</Text>
          </View>
          <View style={styles.pedidoItem}>
            <Text style={styles.pedidoId}>Pedido #1245</Text>
            <Text style={styles.pedidoCliente}>João</Text>
            <Text style={styles.pedidoInfo}>Entrega hoje   R$ 47,00</Text>
          </View>
          <View style={styles.pedidoItem}>
            <Text style={styles.pedidoId}>Pedido #1246</Text>
            <Text style={styles.pedidoCliente}>Maria</Text>
            <Text style={styles.pedidoInfo}>Aguardando confirmação</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Info do estabelecimento */}
      <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Verdurão Dona Florinda</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
          <View style={styles.statusDot} />
          <Text style={styles.onlineText}>Online</Text>
        </View>
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 16, 
    paddingTop: 46 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 24 
  },
  hello: { 
    fontSize: 20, 
    fontWeight: '500', 
    color: '#222' 
  },
  settingsBtn: { 
    backgroundColor: '#F3F3F3', 
    borderRadius: 20, 
    padding: 8 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16, 
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 16 
  },
  cardTitle: { 
    fontWeight: '600', 
    fontSize: 16, 
    color: '#3B4B47' 
  },
  metricsRow: { 
    flexDirection: 'row', 
    marginBottom: 16,
    gap: 16,
  },
  metricCol: { 
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 12,
  },
  metricLabel: { 
    fontSize: 13, 
    color: '#6B7280',
    marginBottom: 4,
  },
  metricValue: { 
    fontWeight: '600', 
    fontSize: 18, 
    color: '#222' 
  },
  chartTabsRow: { 
    flexDirection: 'row', 
    marginTop: 16, 
    marginBottom: 12, 
    gap: 16 
  },
  tab: { 
    color: '#6B7280', 
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tabActive: { 
    color: '#3B4B47', 
    fontWeight: '600', 
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#f0f4f2',
    borderRadius: 8,
  },
  chartBarRow: { 
    flexDirection: 'row', 
    alignItems: 'flex-end', 
    gap: 8, 
    height: 80, 
    marginTop: 12, 
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  chartBar: { 
    flex: 1,
    backgroundColor: '#E3ECE8', 
    borderRadius: 8,
    minHeight: 4,
  },
  produtoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  produtoNome: { 
    fontSize: 15, 
    color: '#3B4B47',
    flex: 2,
  },
  produtoPreco: { 
    fontWeight: '600', 
    color: '#3B4B47', 
    fontSize: 15,
    flex: 1,
    textAlign: 'right',
  },
  produtoQtd: { 
    color: '#6B7280', 
    fontSize: 13,
    flex: 1,
    textAlign: 'right',
  },
  tabsRow: { 
    flexDirection: 'row', 
    gap: 16, 
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  pedidoItem: { 
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pedidoId: { 
    fontWeight: '600', 
    color: '#3B4B47',
    fontSize: 15,
    marginBottom: 4,
  },
  pedidoCliente: { 
    color: '#6B7280', 
    fontSize: 13,
    marginBottom: 2,
  },
  pedidoInfo: { 
    color: '#6B7280', 
    fontSize: 13,
  },
  statusDot: { 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#22c55e', 
    marginRight: 6 
  },
  onlineText: { 
    color: '#6B7280', 
    fontSize: 13 
  },
  menuBtn: { 
    marginRight: 12 
  },
}); 