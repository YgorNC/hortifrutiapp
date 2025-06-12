import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PedidosRecentesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos Recentes</Text>
      {/* Conteúdo da tela de pedidos recentes */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222' },
}); 