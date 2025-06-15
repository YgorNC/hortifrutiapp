import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

// Função para formatar valor monetário
function formatarPreco(valor: string) {
  // Remove tudo que não for número
  let num = valor.replace(/[^0-9]/g, '');
  if (num.length === 0) return '';
  if (num.length === 1) return 'R$ 0,0' + num;
  if (num.length === 2) return 'R$ 0,' + num;
  return 'R$ ' + (parseInt(num.slice(0, -2)).toLocaleString('pt-BR')) + ',' + num.slice(-2);
}

export default function AdicionarProdutoScreen() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [produtos, setProdutos] = useState<{ nome: string; preco: number; quantidade: number }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const adicionarProduto = () => {
    if (!nome || !preco || quantidade < 1) return;
    // Extrai o valor numérico do preço formatado
    const precoNumerico = parseFloat(preco.replace(/[^0-9]/g, '')) / 100;
    const novoProduto = { nome, preco: precoNumerico, quantidade };
    if (editIndex !== null) {
      const novosProdutos = [...produtos];
      novosProdutos[editIndex] = novoProduto;
      setProdutos(novosProdutos);
      setEditIndex(null);
    } else {
      setProdutos([...produtos, novoProduto]);
    }
    setNome('');
    setPreco('');
    setQuantidade(1);
  };

  const editarProduto = (index: number) => {
    const produto = produtos[index];
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setQuantidade(produto.quantidade);
    setEditIndex(index);
  };

  const excluirProduto = (index: number) => {
    const novosProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(novosProdutos);
    setEditIndex(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Adicionar Produtos</Text>
        <TouchableOpacity style={styles.settingsBtn}>
          <Ionicons name="settings" size={22} color="#222" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.box}>
          <Text style={styles.boxTitle}>Adicionar Produtos</Text>
          <View style={styles.rowHeader}>
            <Text style={styles.headerText}>Nome</Text>
            <Text style={styles.headerText}>Preço</Text>
            <Text style={styles.headerText}>Qtd</Text>
          </View>
          <View style={styles.row}>
            <TextInput
              style={styles.inputNome}
              placeholder="produto"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.inputPreco}
              placeholder="R$ 0,00"
              value={preco}
              onChangeText={text => {
                let num = text.replace(/[^0-9]/g, '');
                if (num.length > 8) num = num.slice(0, 8);
                setPreco(formatarPreco(num));
              }}
              keyboardType="numeric"
            />
            <View style={styles.qtdBox}>
              <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
                <Text style={styles.qtdBtn}>-</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.qtdText}
                value={quantidade.toString()}
                keyboardType="numeric"
                onChangeText={text => {
                  const num = parseInt(text.replace(/\D/g, ''));
                  setQuantidade(isNaN(num) || num < 1 ? 1 : num);
                }}
              />
              <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
                <Text style={styles.qtdBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={adicionarProduto}>
            <Text style={styles.addBtnText}>{editIndex !== null ? 'SALVAR' : 'ADICIONAR'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Produtos Adicionados</Text>
          <View style={styles.rowHeader}>
            <Text style={styles.headerText}>Nome</Text>
            <Text style={styles.headerText}>Preço</Text>
            <Text style={styles.headerText}>Qtd</Text>
          </View>
          <FlatList
            data={produtos}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Text style={styles.itemText}>{item.nome}</Text>
                <Text style={styles.itemText}>R$ {item.preco.toFixed(2)}</Text>
                <Text style={styles.itemText}>{item.quantidade}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto adicionado</Text>}
          />
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => editIndex !== null ? setEditIndex(null) : editarProduto(produtos.length - 1)}
              disabled={produtos.length === 0}
            >
              <Text style={styles.editBtnText}>EDITAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => excluirProduto(produtos.length - 1)}
              disabled={produtos.length === 0}
            >
              <Text style={styles.deleteBtnText}>EXCLUIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 46,
    paddingBottom: 24,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 46,
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
  box: { 
    backgroundColor: '#d3e1dd', 
    borderRadius: 12, 
    padding: 16, 
    width: '100%', 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boxTitle: { 
    fontWeight: 'bold', 
    fontSize: 18,
    marginBottom: 16,
    color: '#3B4B47',
  },
  rowHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  headerText: { 
    flex: 1, 
    fontWeight: '600', 
    textAlign: 'center',
    color: '#3B4B47',
    fontSize: 14,
  },
  row: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  inputNome: { 
    flex: 2, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 12, 
    marginRight: 8,
    fontSize: 15,
    height: 48,
  },
  inputPreco: { 
    flex: 1, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    padding: 12, 
    marginRight: 8,
    fontSize: 15,
    height: 48,
  },
  qtdBox: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 48,
    width: 120,
  },
  qtdBtn: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3B4B47', 
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: 32,
  },
  qtdText: { 
    fontSize: 16, 
    fontWeight: 'bold',
    width: 32,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  addBtn: { 
    backgroundColor: '#8fd6a5', 
    borderRadius: 8, 
    padding: 12, 
    marginTop: 12, 
    alignItems: 'center',
  },
  addBtnText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16,
  },
  itemText: { 
    flex: 1, 
    textAlign: 'center',
    fontSize: 15,
    color: '#3B4B47',
  },
  emptyText: { 
    textAlign: 'center', 
    color: '#888', 
    marginVertical: 12,
    fontSize: 15,
  },
  actionRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 12,
    gap: 8,
  },
  editBtn: { 
    backgroundColor: '#a3bcd6', 
    borderRadius: 8, 
    padding: 12, 
    flex: 1, 
    alignItems: 'center',
  },
  editBtnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
  },
  deleteBtn: { 
    backgroundColor: '#d68f8f', 
    borderRadius: 8, 
    padding: 12, 
    flex: 1, 
    alignItems: 'center',
  },
  deleteBtnText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 15,
  },
});
