import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1E293B',
        tabBarInactiveTintColor: '#94A3B8',
        headerStyle: { backgroundColor: '#1E293B' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catálogo',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>👕</Text>,
        }}
      />
      <Tabs.Screen
        name="agregar"
        options={{
          title: 'Nueva Prenda',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>➕</Text>,
        }}
      />
    </Tabs>
  );
}