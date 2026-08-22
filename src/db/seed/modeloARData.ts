import type { NewModeloAR, NewCamadaModelo, NewEstadoSimulacao } from '../schema';

export const MODELO_AR_SEED: Omit<NewModeloAR, 'hardwareId'> = {
  nome: 'PC Gamer Genérico',
  descricao: 'Um desktop padrão com gabinete aberto e ventoinhas com iluminação, focado para estudo anatômico.',
  qrCodePath: 'marker0.png', 
  modelo3dPath: 'pc_gamer_base.glb', 
};

export const CAMADAS_SEED: Omit<NewCamadaModelo, 'modeloArId'>[] = [
  {
    nome: 'Gabinete Lateral',
    meshId: 'mesh_gabinete',
    ordemRemocao: 1,
    visivelPorPadrao: true,
  },
  {
    nome: 'Fans e Cooler',
    meshId: 'mesh_fans',
    ordemRemocao: 2,
    visivelPorPadrao: true,
  },
  {
    nome: 'Placa de Vídeo (GPU)',
    meshId: 'mesh_gpu',
    ordemRemocao: 3,
    visivelPorPadrao: true,
  },
  {
    nome: 'Memória RAM',
    meshId: 'mesh_ram',
    ordemRemocao: 4,
    visivelPorPadrao: true,
  },
  {
    nome: 'Placa-mãe e CPU',
    meshId: 'mesh_cpu_motherboard',
    ordemRemocao: 5,
    visivelPorPadrao: true,
  },
];

export const ESTADOS_SEED: Omit<NewEstadoSimulacao, 'modeloArId'>[] = [
  {
    nome: 'Desligado',
    animacaoId: null, // Sem animação, meshes no estado estático
  },
  {
    nome: 'Ligado (Operação)',
    animacaoId: 'anim_fans_rotation', 
  },
  {
    nome: 'Foco no Processador',
    animacaoId: null, // O zoom será gerido pela câmera, não necessariamente uma animação no glTF
  },
];
