import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { EnciclopediaScreen } from '../src/screens/EnciclopediaScreen';
import { useHardwares } from '../src/hooks/useHardwares';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

// Mocks
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('../src/hooks/useHardwares', () => ({
  useHardwares: jest.fn(),
}));

describe('EnciclopediaScreen', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });
  });

  it('deve renderizar o estado de carregamento', async () => {
    (useHardwares as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<EnciclopediaScreen />);
    });
    
    const root = renderer!.root;
    const textNodes = root.findAllByType('Text' as never);
    const textContents = textNodes.map(node => node.props.children);
    expect(textContents).toContain('Carregando catálogo...');
  });

  it('deve renderizar erro se falhar ao buscar do SQLite', async () => {
    (useHardwares as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: 'Erro de conexão com o SQLite',
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<EnciclopediaScreen />);
    });
    
    const root = renderer!.root;
    const textNodes = root.findAllByType('Text' as never);
    const textContents = textNodes.map(node => node.props.children);
    expect(textContents).toContain('Erro de conexão com o SQLite');
  });

  it('deve renderizar a mensagem de vazio se não houver dados', async () => {
    (useHardwares as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<EnciclopediaScreen />);
    });
    
    const root = renderer!.root;
    const flatList = root.findByType(FlatList);
    
    // Verifica se os dados passados para a lista estão vazios
    expect(flatList.props.data).toEqual([]);
    // Opcional: checar se ListEmptyComponent existe
    expect(flatList.props.ListEmptyComponent).toBeDefined();
  });

  it('deve renderizar a lista de hardwares corretamente e navegar no clique', async () => {
    const mockData = [
      {
        id: 1,
        nome: 'Processador Teste',
        descricao: 'Uma CPU de teste.',
        imagemPath: 'file://path/to/cpu.png',
        createdAt: '2023-01-01',
      }
    ];

    (useHardwares as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    let renderer: ReactTestRenderer.ReactTestRenderer;
    await ReactTestRenderer.act(async () => {
      renderer = ReactTestRenderer.create(<EnciclopediaScreen />);
    });
    
    const root = renderer!.root;
    const flatList = root.findByType(FlatList);
    
    // Verifica se os dados foram passados corretamente para a lista
    expect(flatList.props.data).toEqual(mockData);

    // Testa a execução do renderItem e a navegação (sem renderizar a árvore inteira)
    const renderItemFunction = flatList.props.renderItem;
    const renderedItem = renderItemFunction({ item: mockData[0] });
    
    // O onPress do TouchableOpacity dentro do renderItem deve chamar o navigate
    const onPress = renderedItem.props.onPress;
    onPress();

    expect(mockNavigate).toHaveBeenCalledWith('HardwareDetail', { id: 1 });
  });
});
