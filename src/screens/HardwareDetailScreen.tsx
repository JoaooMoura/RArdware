import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootDrawerParamList } from '@navigation/types';
import { colors } from '@theme';

type HardwareDetailRouteProp = RouteProp<RootDrawerParamList, 'HardwareDetail'>;

export function HardwareDetailScreen() {
  const route = useRoute<HardwareDetailRouteProp>();
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do Hardware ID: {id}</Text>
      <Text style={styles.subtext}>(Implementação completa na próxima fase)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
  },
});
