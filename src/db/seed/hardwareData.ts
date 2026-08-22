import type { NewHardware } from '../schema';

export const HARDWARE_SEED_DATA: NewHardware[] = [
  {
    nome: 'Processador (CPU)',
    descricao:
      'O cérebro do computador. Responsável por processar e executar as principais instruções dos programas.',
    imagemPath: 'placeholder.png', // O require real no RN é avaliado no JS bundle, no SQLite guardamos apenas a referência relativa
  },
  {
    nome: 'Memória RAM',
    descricao:
      'Memória de acesso rápido e volátil, usada para armazenar dados dos programas que estão sendo executados no momento.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Placa de Vídeo (GPU)',
    descricao:
      'Responsável por renderizar imagens, vídeos e gráficos 3D. Essencial para jogos e softwares de modelagem.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Armazenamento (SSD/HD)',
    descricao:
      'Unidade de armazenamento persistente. Guarda o sistema operacional, arquivos e programas instalados.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Placa-Mãe (Motherboard)',
    descricao:
      'A placa principal que interliga e fornece energia para todos os outros componentes do computador.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Fonte de Alimentação (PSU)',
    descricao:
      'Converte a energia da tomada (AC) para correntes contínuas (DC) utilizáveis pelos componentes do PC.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Cooler (Air/Water)',
    descricao:
      'Sistema de resfriamento essencial para evitar o superaquecimento do processador durante o uso.',
    imagemPath: 'placeholder.png',
  },
  {
    nome: 'Gabinete (Case)',
    descricao:
      'A estrutura externa que abriga, protege e organiza todos os componentes internos do computador.',
    imagemPath: 'placeholder.png',
  },
];
