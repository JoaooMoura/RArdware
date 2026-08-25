import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '@components/DrawerContent';
import { Simulador3DScreen } from '@screens/Simulador3DScreen';
import { EnciclopediaScreen } from '@screens/EnciclopediaScreen';
import { HardwareDetailScreen } from '@screens/HardwareDetailScreen';
import { HomeScreen } from '@screens/HomeScreen';
import { ManualScreen } from '@screens/ManualScreen';
import { colors } from '@theme';
import type { RootDrawerParamList } from './types';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function RootNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={DrawerContent}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.darkDeep,
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 18,
        },
        drawerStyle: {
          width: '78%',
          backgroundColor: colors.drawerBg,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'RArdware Início',
          headerTitle: 'RArdware',
        }}
      />
      <Drawer.Screen
        name="Simulador3D"
        component={Simulador3DScreen}
        options={{
          title: 'Simulador 3D',
          headerTitle: 'Montagem de PC',
        }}
      />
      <Drawer.Screen
        name="Enciclopedia"
        component={EnciclopediaScreen}
        options={{
          title: 'Enciclopédia',
          headerTitle: 'Enciclopédia de Hardware',
        }}
      />
      <Drawer.Screen
        name="HardwareDetail"
        component={HardwareDetailScreen}
        options={{
          title: 'Detalhes da Peça',
          headerTitle: 'Detalhes',
          drawerItemStyle: { display: 'none' } // Oculta a tela de detalhes do menu da gaveta
        }}
      />
      <Drawer.Screen
        name="Manual"
        component={ManualScreen}
        options={{
          title: 'Manual de Instruções',
          headerTitle: 'Manual de Instruções',
        }}
      />
    </Drawer.Navigator>
  );
}
