import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '@theme';

interface StepCardProps {
  step: string;
  title: string;
  description: string;
}

function StepCard({ step, title, description }: StepCardProps) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{step}</Text>
      </View>
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>{title}</Text>
        <Text style={styles.stepDescription}>{description}</Text>
      </View>
    </View>
  );
}

export function ManualScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introBox}>
        <Text style={styles.introTitle}>📖 Guia do Laboratório</Text>
        <Text style={styles.introDescription}>
          Instruções fundamentais para operação segura de componentes e utilização do aplicativo
          RArdware durante as aulas práticas.
        </Text>
      </View>

      <Text style={styles.sectionHeading}>Passos para Utilização da Realidade Aumentada</Text>

      <StepCard
        step="01"
        title="Posicionamento do Marcador"
        description="Coloque o marcador impresso sobre uma superfície plana, bem iluminada e sem reflexos diretos."
      />

      <StepCard
        step="02"
        title="Abertura da Câmera RA"
        description="Abra a aba 'Realidade Aumentada' no menu lateral e conceda as permissões de acesso à câmera."
      />

      <StepCard
        step="03"
        title="Interação e Inspeção"
        description="Mantenha o celular a cerca de 20-30cm do marcador para visualizar o modelo 3D, rotacionar e inspecionar pinagens."
      />

      <StepCard
        step="04"
        title="Consulta à Enciclopédia"
        description="Toque nos pontos de interesse do modelo 3D ou acesse o catálogo para ler a ficha técnica do componente."
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
  introBox: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 6,
  },
  introDescription: {
    fontSize: 13,
    color: '#1E3A8A',
    lineHeight: 19,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 1,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
