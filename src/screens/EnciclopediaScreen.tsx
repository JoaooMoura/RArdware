import React from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '@theme';

interface MockComponent {
  id: string;
  name: string;
  category: string;
  description: string;
}

const MOCK_ITEMS: MockComponent[] = [
  {
    id: '1',
    name: 'Processador (CPU)',
    category: 'Processamento',
    description:
      'Unidade central de processamento responsável por executar instruções de programas.',
  },
  {
    id: '2',
    name: 'Memória RAM',
    category: 'Armazenamento Temporário',
    description: 'Memória de acesso rápido volátil utilizada para armazenar dados em execução.',
  },
  {
    id: '3',
    name: 'Placa-Mãe (Motherboard)',
    category: 'Interconexão',
    description:
      'Placa de circuito impresso que conecta todos os periféricos e componentes do computador.',
  },
  {
    id: '4',
    name: 'Placa de Vídeo (GPU)',
    category: 'Processamento Gráfico',
    description: 'Hardware dedicado à renderização de imagens, vídeos e computação paralela.',
  },
];

export function EnciclopediaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar componente ou tecnologia..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      <FlatList
        data={MOCK_ITEMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInput: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
