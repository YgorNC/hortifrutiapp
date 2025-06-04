import '../global.css';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

function useAuth() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simula delay para carregar usuário
    setTimeout(() => {
      setUser(null); // Troque para objeto {id: '123'} para simular usuário logado
      setLoading(false);
    }, 500);
  }, []);

  return { user, loading };
}

export default function RootLayout() {
  const router = useRouter();
  const { user, loading } = useAuth();

  React.useEffect(() => {
    if (!loading) {
      if (user) {
        // Usuário logado: vai para drawer
        router.replace('/(drawer)');
      } else {
        // Usuário deslogado: vai para login
        router.replace('/login');
      }
    }
  }, [user, loading]);

  if (loading) {
    // Retorna null ou um loading screen simples
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Coloque aqui todas as suas rotas para que o Stack conheça elas */}
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name="register-option" options={{headerShown: false}} />
        <Stack.Screen name="register-buyer" options={{headerShown: false}}/>
        <Stack.Screen name="register-seller" options={{headerShown: false}}/>
        <Stack.Screen name="(drawer)" options={{headerShown: false}} />
      </Stack>
    </GestureHandlerRootView>
  );
}
