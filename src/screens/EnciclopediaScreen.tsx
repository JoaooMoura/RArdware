import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { RootDrawerNavigationProp } from '@navigation/types';
import { colors } from '@theme';
import { useHardwares } from '../hooks/useHardwares';

export function EnciclopediaScreen() {
  const { data, isLoading, error } = useHardwares();
  const navigation = useNavigation<RootDrawerNavigationProp<'Enciclopedia'>>();

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4D6BFF" />
        <Text style={styles.loadingText}>Carregando catálogo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum componente cadastrado.</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('HardwareDetail', { id: item.id })}
          >
            {item.imagemPath && (item.imagemPath.startsWith('http') || item.imagemPath.startsWith('file://')) ? (
              <Image 
                source={{ uri: item.imagemPath }} 
                style={styles.cardImage} 
                resizeMode="cover" 
              />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>No Img</Text>
              </View>
            )}
            
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.nome}</Text>
              <Text style={styles.cardDescription} numberOfLines={2}>
                {item.descricao}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0c10', // Dark theme aplicado
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#0b0c10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#CBD5E1',
    marginTop: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 40,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#15161c',
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
    elevation: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: '#222',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#555',
    fontSize: 12,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
  },
});
