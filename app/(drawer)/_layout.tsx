// app/(drawer)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
// Importe seu componente CustomDrawerContent.tsx
import CustomDrawerContent from '../../components/CustomDrawerContent'; // Ajuste o caminho se seu arquivo for CustomDrawer.tsx

export default function DrawerLayout() {
  return (
    <Drawer
      // Aqui você especifica o componente customizado para o conteúdo do drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        
        headerShown: false,
      }}
    >
     
      <Drawer.Screen
        name="(tabs)" 
        options={{
          title: 'Principal', 
         
         
          headerShown: false,
        }}
      />
    </Drawer>
  );
}