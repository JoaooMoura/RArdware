import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#172E54" />
      <View style={styles.header}>
        <Text style={styles.logo}>RArdware</Text>
        <Text style={styles.subtitle}>Realidade Aumentada para Ensino de Hardware</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SETUP T01.1 OK</Text>
        </View>
        <Text style={styles.title}>Ambiente & Projeto Prontos!</Text>
        <Text style={styles.description}>
          React Native Bare configurado com TypeScript Strict, ESLint, Prettier, e Path Aliases.
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Plataforma:</Text>
          <Text style={styles.infoValue}>Android</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Engine AR:</Text>
          <Text style={styles.infoValue}>AR.js + Babylon.js</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Banco Local:</Text>
          <Text style={styles.infoValue}>SQLite + Drizzle</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#172E54',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 38,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0B3D6',
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    elevation: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8EDFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 16,
  },
  badgeText: {
    color: '#2F54FF',
    fontWeight: '700',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 13,
    color: '#777777',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    color: '#1B3CD4',
    fontWeight: '700',
  },
});

export default App;
