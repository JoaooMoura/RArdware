import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@theme';
import type { RootDrawerNavigationProp } from '@navigation/types';

interface ActionCardProps {
  icon: string;
  title: string;
  description: string;
  tag: string;
  onPress: () => void;
}

function ActionCard({ icon, title, description, tag, onPress }: ActionCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <View style={styles.cardTag}>
          <Text style={styles.cardTagText}>{tag}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<RootDrawerNavigationProp<'Home'>>();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>🚀 RArdware v0.0.1</Text>
        </View>
        <Text style={styles.heroTitle}>Aprenda Hardware com Interatividade</Text>
        <Text style={styles.heroSubtitle}>
          Explore componentes, visualize modelos em 3D com Realidade Aumentada e consulte manuais
          detalhados.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Módulos Disponíveis</Text>

      <ActionCard
        icon="📷"
        title="Realidade Aumentada"
        description="Aponte a câmera para marcadores e visualize circuitos e hardware em 3D interativo."
        tag="Módulo AR"
        onPress={() => navigation.navigate('RealidadeAumentada')}
      />

      <ActionCard
        icon="📚"
        title="Enciclopédia de Hardware"
        description="Consulte especificações técnicas, pinagens e descrições dos componentes integrados ao SQLite."
        tag="Catálogo"
        onPress={() => navigation.navigate('Enciclopedia')}
      />

      <ActionCard
        icon="📖"
        title="Manual de Instruções"
        description="Guia passo a passo de montagem, manuseio e boas práticas para laboratório de informática."
        tag="Documentação"
        onPress={() => navigation.navigate('Manual')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: colors.darkDeep,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    elevation: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(47, 84, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
  },
  badgeText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 19,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
    letterSpacing: 0.2,
  },
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  cardTagText: {
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
