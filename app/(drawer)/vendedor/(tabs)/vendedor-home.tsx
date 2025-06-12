import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

export default function VendedorHomeScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const handleAdicionarProduto = () => {
    navigation.navigate('adicionar-produto');
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.hello}>Olá, Vendedor!</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Painel de Desempenho */}
      <TouchableOpacity>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Painel de Desempenho</Text>
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
          <Text style={styles.produtoQtd}>25 kg</Text>
        </View>
        <View style={styles.produtoRow}>
          <Text style={styles.produtoNome}>Repolho</Text>
          <Text style={styles.produtoPreco}>R$ 4,99</Text>
          <Text style={styles.produtoQtd}>8 kg</Text>
        </View>
      </View>
      </TouchableOpacity>

      {/* Pedidos Recentes */}
      <TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pedidos Recentes</Text>
          <View style={styles.tabsRow}>
            <Text style={styles.tabActive}>Todos</Text>
            <Text style={styles.tab}>Pendentes</Text>
            <Text style={styles.tab}>Entregues</Text>
          </View>
          <View style={styles.pedidoItem}>
            <Text style={styles.pedidoId}>Pedido #1245</Text>
            <Text style={styles.pedidoCliente}>João</Text>
            <Text style={styles.pedidoInfo}>Dntrega hoje   R$ 47,00</Text>
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
  container: { flex: 1, backgroundColor: '#fff', padding: 16, paddingTop: 46 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  hello: { fontSize: 20, fontWeight: '500', color: '#222' },
  settingsBtn: { backgroundColor: '#F3F3F3', borderRadius: 20, padding: 8 },
  card: { backgroundColor: '#E3ECE8', borderRadius: 12, padding: 14, marginBottom: 14, width: '100%'},
  cardTitle: { fontWeight: 'bold', fontSize: 16, color: '#3B4B47', marginBottom: 8 },
  metricsRow: { flexDirection: 'row', marginBottom: 4 },
  metricCol: { flex: 1 },
  metricLabel: { fontSize: 13, color: '#3B4B47' },
  metricValue: { fontWeight: 'bold', fontSize: 15, color: '#222' },
  chartTabsRow: { flexDirection: 'row', marginTop: 8, marginBottom: 4, gap: 12 },
  tab: { color: '#3B4B47', fontSize: 13, marginRight: 12 },
  tabActive: { color: '#222', fontWeight: 'bold', fontSize: 13, marginRight: 12, textDecorationLine: 'underline' },
  chartBarRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 70, marginTop: 8, marginBottom: 4 },
  chartBar: { width: 14, backgroundColor: '#B6CFC2', borderRadius: 4 },
  produtoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  produtoNome: { fontSize: 15, color: '#222' },
  produtoPreco: { fontWeight: 'bold', color: '#3B4B47', fontSize: 15 },
  produtoQtd: { color: '#3B4B47', fontSize: 13 },
  tabsRow: { flexDirection: 'row', gap: 12, marginBottom: 6 },
  pedidoItem: { marginBottom: 6 },
  pedidoId: { fontWeight: 'bold', color: '#222' },
  pedidoCliente: { color: '#3B4B47', fontSize: 13 },
  pedidoInfo: { color: '#3B4B47', fontSize: 13 },
  starsRow: { flexDirection: 'row', marginVertical: 6 },
  msg: { color: '#3B4B47', fontSize: 13 },
  statusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#3DC16B', marginRight: 6 },
  onlineText: { color: '#3B4B47', fontSize: 13 },
  menuBtn: { marginRight: 12 },
}); 