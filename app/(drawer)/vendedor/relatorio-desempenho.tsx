import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

export default function RelatorioDesempenhoScreen() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [periodoSelecionado, setPeriodoSelecionado] = useState('dia');

  const periodos = [
    { id: 'dia', label: 'Hoje' },
    { id: 'semana', label: 'Última Semana' },
    { id: 'mes', label: 'Último Mês' },
    { id: 'ano', label: 'Último Ano' },
  ];

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
        <Text style={styles.title}>Relatório de Desempenho</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Seletor de Período */}
      <View style={styles.periodoContainer}>
        {periodos.map((periodo) => (
          <TouchableOpacity
            key={periodo.id}
            style={[
              styles.periodoBtn,
              periodoSelecionado === periodo.id && styles.periodoBtnActive,
            ]}
            onPress={() => setPeriodoSelecionado(periodo.id)}
          >
            <Text
              style={[
                styles.periodoText,
                periodoSelecionado === periodo.id && styles.periodoTextActive,
              ]}
            >
              {periodo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Métricas Principais */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Métricas Principais</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Total de Pedidos</Text>
            <Text style={styles.metricValue}>156</Text>
            <Text style={styles.metricChange}>+12% vs período anterior</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Valor Total</Text>
            <Text style={styles.metricValue}>R$ 2.450,00</Text>
            <Text style={styles.metricChange}>+8% vs período anterior</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Ticket Médio</Text>
            <Text style={styles.metricValue}>R$ 15,70</Text>
            <Text style={styles.metricChange}>-3% vs período anterior</Text>
          </View>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Clientes Ativos</Text>
            <Text style={styles.metricValue}>45</Text>
            <Text style={styles.metricChange}>+5% vs período anterior</Text>
          </View>
        </View>
      </View>

      {/* Produtos Mais Vendidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Produtos Mais Vendidos</Text>
        <View style={styles.produtosList}>
          <View style={styles.produtoItem}>
            <Text style={styles.produtoNome}>Alface</Text>
            <Text style={styles.produtoQtd}>120 unidades</Text>
            <Text style={styles.produtoValor}>R$ 840,00</Text>
          </View>
          <View style={styles.produtoItem}>
            <Text style={styles.produtoNome}>Tomate</Text>
            <Text style={styles.produtoQtd}>85 unidades</Text>
            <Text style={styles.produtoValor}>R$ 595,00</Text>
          </View>
          <View style={styles.produtoItem}>
            <Text style={styles.produtoNome}>Cenoura</Text>
            <Text style={styles.produtoQtd}>65 unidades</Text>
            <Text style={styles.produtoValor}>R$ 325,00</Text>
          </View>
        </View>
      </View>

      {/* Histórico de Desempenho */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Histórico de Desempenho</Text>
        <View style={styles.historicoList}>
          <View style={styles.historicoItem}>
            <Text style={styles.historicoData}>15/03/2024</Text>
            <Text style={styles.historicoValor}>R$ 320,00</Text>
            <Text style={styles.historicoPedidos}>25 pedidos</Text>
          </View>
          <View style={styles.historicoItem}>
            <Text style={styles.historicoData}>14/03/2024</Text>
            <Text style={styles.historicoValor}>R$ 280,00</Text>
            <Text style={styles.historicoPedidos}>22 pedidos</Text>
          </View>
          <View style={styles.historicoItem}>
            <Text style={styles.historicoData}>13/03/2024</Text>
            <Text style={styles.historicoValor}>R$ 350,00</Text>
            <Text style={styles.historicoPedidos}>28 pedidos</Text>
          </View>
        </View>
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
  periodoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  periodoBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
  },
  periodoBtnActive: {
    backgroundColor: '#3B4B47',
  },
  periodoText: {
    color: '#3B4B47',
    fontSize: 13,
  },
  periodoTextActive: {
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  metricLabel: {
    fontSize: 13,
    color: '#3B4B47',
    marginBottom: 4,
  },
  metricValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    color: '#3B4B47',
  },
  produtosList: {
    gap: 8,
  },
  produtoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  produtoNome: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
  },
  produtoQtd: {
    fontSize: 13,
    color: '#3B4B47',
  },
  produtoValor: {
    fontSize: 14,
    color: '#3B4B47',
    fontWeight: '500',
  },
  historicoList: {
    gap: 8,
  },
  historicoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  historicoData: {
    fontSize: 14,
    color: '#222',
  },
  historicoValor: {
    fontSize: 14,
    color: '#3B4B47',
    fontWeight: '500',
  },
  historicoPedidos: {
    fontSize: 13,
    color: '#3B4B47',
  },
}); 