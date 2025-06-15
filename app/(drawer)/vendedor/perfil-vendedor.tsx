import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

const estados = [
  { label: 'AC', value: 'AC' }, { label: 'AL', value: 'AL' }, { label: 'AP', value: 'AP' },
  { label: 'AM', value: 'AM' }, { label: 'BA', value: 'BA' }, { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' }, { label: 'ES', value: 'ES' }, { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' }, { label: 'MT', value: 'MT' }, { label: 'MS', value: 'MS' },
  { label: 'MG', value: 'MG' }, { label: 'PA', value: 'PA' }, { label: 'PB', value: 'PB' },
  { label: 'PR', value: 'PR' }, { label: 'PE', value: 'PE' }, { label: 'PI', value: 'PI' },
  { label: 'RJ', value: 'RJ' }, { label: 'RN', value: 'RN' }, { label: 'RS', value: 'RS' },
  { label: 'RO', value: 'RO' }, { label: 'RR', value: 'RR' }, { label: 'SC', value: 'SC' },
  { label: 'SP', value: 'SP' }, { label: 'SE', value: 'SE' }, { label: 'TO', value: 'TO' },
];

export default function PerfilVendedor() {
  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const [nome, setNome] = useState('Verdurão Dona Florinda');
  const [logradouro, setLogradouro] = useState('Av. das Hortaliças');
  const [numero, setNumero] = useState('456');
  const [bairro, setBairro] = useState('Centro');
  const [cidade, setCidade] = useState('Rio de Janeiro');
  const [uf, setUf] = useState('RJ');
  const [cep, setCep] = useState('98765-432');
  const [cnpj, setCnpj] = useState('12.345.678/0001-99');
  const [horarioAbertura, setHorarioAbertura] = useState('08:00');
  const [horarioFechamento, setHorarioFechamento] = useState('18:00');
  const [telefone, setTelefone] = useState('(21) 99876-5432');
  const [email, setEmail] = useState('maria@hortifruit.com');
  const [editando, setEditando] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#fff' }}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 64 }}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Cabeçalho */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32 }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.menuBtn}>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={{ flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '500', color: '#222' }}>
            Perfil do Vendedor
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('configuracoes')} style={styles.settingsBtn}>
            <Ionicons name="settings" size={22} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Avatar + Nome */}
        <View style={{ alignItems: 'center', marginBottom: 32 }}>
          <View style={{ width: 112, height: 112, borderRadius: 56, borderWidth: 2, borderColor: '#22c55e', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Ionicons name="person" size={64} color="#374151" />
          </View>
          <Text style={{ marginTop: 12, fontSize: 22, fontWeight: 'bold', color: '#1F2937' }}>{nome}</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Feather name="camera" size={18} color="#6B7280" />
            <Text style={{ marginLeft: 4, fontSize: 14, color: '#6B7280' }}>Alterar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Card de Informações */}
        <View style={{ backgroundColor: '#f9fafb', borderRadius: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, paddingHorizontal: 24, paddingVertical: 24, marginBottom: 32 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 16 }}>Informações do Estabelecimento</Text>

          {/* Nome do Estabelecimento */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>Nome do Estabelecimento</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2 }}>
              <Feather name="user" size={18} color="#6B7280" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#1F2937', padding: 0 }}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome do estabelecimento"
                placeholderTextColor="#9CA3AF"
                editable={editando}
              />
            </View>
          </View>

          {/* CNPJ */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>CNPJ</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2 }}>
              <Feather name="hash" size={18} color="#6B7280" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#1F2937', padding: 0 }}
                value={cnpj}
                onChangeText={setCnpj}
                placeholder="00.000.000/0000-00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                editable={editando}
              />
            </View>
          </View>

          {/* Endereço Completo */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>Endereço</Text>
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Logradouro</Text>
            <TextInput
              style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937', marginBottom: 4 }}
              value={logradouro}
              onChangeText={setLogradouro}
              placeholder="Rua/Avenida"
              placeholderTextColor="#9CA3AF"
              editable={editando}
            />
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Número</Text>
            <TextInput
              style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937', marginBottom: 4 }}
              value={numero}
              onChangeText={setNumero}
              placeholder="Número"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              editable={editando}
            />
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Bairro</Text>
            <TextInput
              style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937', marginBottom: 4 }}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
              placeholderTextColor="#9CA3AF"
              editable={editando}
            />
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Cidade</Text>
            <TextInput
              style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937', marginBottom: 4 }}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
              placeholderTextColor="#9CA3AF"
              editable={editando}
            />
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Unidade Federativa (UF)</Text>
            <View style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 4, height: 56, minHeight: 56, justifyContent: 'center', paddingHorizontal: 8, overflow: 'visible' }}>
              <Picker
                selectedValue={uf}
                onValueChange={setUf}
                style={{ height: 56, minHeight: 56, fontSize: 18, width: '100%' }}
                enabled={editando}
              >
                {estados.map((estado) => (
                  <Picker.Item key={estado.value} label={estado.label} value={estado.value} />
                ))}
              </Picker>
            </View>
            <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>CEP</Text>
            <TextInput
              style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937', marginBottom: 4 }}
              value={cep}
              onChangeText={setCep}
              placeholder="CEP"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              editable={editando}
            />
          </View>

          {/* Horário de Funcionamento */}
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937', marginBottom: 8 }}>Horário de Funcionamento</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Abertura</Text>
              <TextInput
                style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937' }}
                value={horarioAbertura}
                onChangeText={setHorarioAbertura}
                placeholder="08:00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={5}
                editable={editando}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: '#374151', marginBottom: 2 }}>Fechamento</Text>
              <TextInput
                style={{ backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 12, paddingVertical: 8, fontSize: 15, color: '#1F2937' }}
                value={horarioFechamento}
                onChangeText={setHorarioFechamento}
                placeholder="18:00"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={5}
                editable={editando}
              />
            </View>
          </View>

          {/* Telefone e Email (mantidos) */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>Telefone</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2 }}>
              <Feather name="phone" size={18} color="#6B7280" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#1F2937', padding: 0 }}
                value={telefone}
                onChangeText={setTelefone}
                placeholder="(21) 99876-5432"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                editable={editando}
              />
            </View>
          </View>
          <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 6 }}>Email</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', paddingHorizontal: 16, paddingVertical: 12, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 2 }}>
              <Feather name="mail" size={18} color="#6B7280" />
              <TextInput
                style={{ flex: 1, marginLeft: 12, fontSize: 15, color: '#1F2937', padding: 0 }}
                value={email}
                onChangeText={setEmail}
                placeholder="seu-email@exemplo.com"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                editable={editando}
              />
            </View>
          </View>

          {/* Botão: Atualizar Dados */}
          <TouchableOpacity
            onPress={() => {
              if (editando) {
                // Aqui você poderia salvar as alterações
                setEditando(false);
              } else {
                setEditando(true);
              }
            }}
            style={{ backgroundColor: '#22c55e', paddingVertical: 14, borderRadius: 999, alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>{editando ? 'Salvar' : 'Atualizar'}</Text>
          </TouchableOpacity>
        </View>

        {/* Botão de Sair */}
        <TouchableOpacity
          onPress={() => {
            // Lógica de logout
            router.replace('/login');
          }}
          style={{ backgroundColor: '#22c55e', paddingVertical: 14, borderRadius: 999, alignItems: 'center', marginBottom: 24, marginHorizontal: 32, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4 }}
        >
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Sair da conta</Text>
        </TouchableOpacity>

        {/* Espaço extra para "respiro" */}
        <View style={{ height: 64 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  menuBtn: {
    marginRight: 12,
  },
  settingsBtn: {
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    padding: 8,
  },
}); 