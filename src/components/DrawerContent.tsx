import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { colors } from '@theme';
import type { RootDrawerParamList } from '@navigation/types';

interface MenuItem {
  key: keyof RootDrawerParamList;
  label: string;
  icon: string;
  description: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    key: 'Home',
    label: 'Início',
    icon: '🏠',
    description: 'Visão geral e atalhos',
  },
  {
    key: 'RealidadeAumentada',
    label: 'Realidade Aumentada',
    icon: '📷',
    description: 'Scanner e projeção 3D',
  },
  {
    key: 'Enciclopedia',
    label: 'Enciclopédia',
    icon: '📚',
    description: 'Catálogo de componentes',
  },
  {
    key: 'Manual',
    label: 'Manual de Instruções',
    icon: '📖',
    description: 'Guia de uso e montagem',
  },
];

export function DrawerContent(props: DrawerContentComponentProps) {
  const { state, navigation } = props;
  const currentRouteName = state.routes[state.index]?.name;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoBadgeText}>RA</Text>
        </View>
        <Text style={styles.logoTitle}>RArdware</Text>
        <Text style={styles.logoSubtitle}>Hardware em Realidade Aumentada</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map(item => {
          const isActive = currentRouteName === item.key;
          return (
            <TouchableOpacity
              key={item.key}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => navigation.navigate(item.key)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>v0.0.1 — Build de Desenvolvimento</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.drawerBg,
    paddingTop: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoBadgeText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.drawerText,
    letterSpacing: 0.5,
  },
  logoSubtitle: {
    fontSize: 12,
    color: colors.drawerInactiveText,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  menuItemActive: {
    backgroundColor: 'rgba(47, 84, 255, 0.25)',
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.drawerInactiveText,
  },
  menuLabelActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  menuDescription: {
    fontSize: 11,
    color: 'rgba(160, 179, 214, 0.7)',
    marginTop: 2,
  },
  activeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  footerText: {
    fontSize: 11,
    color: 'rgba(160, 179, 214, 0.5)',
    textAlign: 'center',
  },
});
