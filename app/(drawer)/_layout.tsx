
import { Drawer } from 'expo-router/drawer';

import CustomDrawerContent from '../../components/CustomDrawerContent'; 

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