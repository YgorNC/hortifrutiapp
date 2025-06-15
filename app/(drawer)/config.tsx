import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const handleLinkPress = (link: string) => {
    router.push({
      pathname: '/termos',
      params: { type: link.toLowerCase().replace(/\s+/g, '-') }
    });
  };

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Configurações de Perfil</Text>
      </View>

      <TouchableOpacity style={styles.item}>
        <Ionicons name="person-outline" size={28} color="black" />
        <Text style={styles.itemText}>Meu Perfil</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.item}>
        <MaterialIcons name="bookmark-border" size={28} color="black" />
        <Text style={styles.itemText}>Histórico de Compras</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.item}>
        <Ionicons name="notifications-outline" size={28} color="black" />
        <Text style={styles.itemText}>Notificações</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.divider} />

      <TouchableOpacity style={styles.item}>
        <FontAwesome name="credit-card" size={28} color="black" />
        <Text style={styles.itemText}>Pagamentos</Text>
        <Ionicons name="chevron-forward" size={24} color="gray" style={styles.arrow} />
      </TouchableOpacity>
      <View style={styles.divider} />

      <View style={styles.links}>
        <TouchableOpacity onPress={() => handleLinkPress('Central de ajuda')}>
          <Text style={styles.link}>Central de ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('Termos de serviços')}>
          <Text style={styles.link}>Termos de serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('Código de conduta')}>
          <Text style={styles.link}>Código de conduta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLinkPress('Privacidade')}>
          <Text style={styles.link}>Privacidade</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.sair}>Sair</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 46 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 30, backgroundColor: '#E9E9E9', borderRadius: 12, padding: 12 },
  title: { fontSize: 20, fontWeight: '500', marginLeft: 16 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 18 },
  itemText: { fontSize: 16, marginLeft: 16, flex: 1 },
  arrow: { marginLeft: 'auto' },
  divider: { height: 1, backgroundColor: '#ccc' },
  links: { marginTop: 32, marginBottom: 16 },
  link: { fontSize: 14, color: '#222', marginBottom: 12 },
  sair: { fontWeight: 'bold', color: '#000', fontSize: 16, marginTop: 16 },
});