import { sqliteConnection } from '../client';
import { HARDWARE_SEED_DATA } from './hardwareData';
import { MODELO_AR_SEED, CAMADAS_SEED, ESTADOS_SEED } from './modeloARData';

export async function executeSeed(db: any) {
  try {
    console.log('🌱 Seed passo 1: Verificando banco (RAW SQL)');
    
    // Usar executeAsync se disponível, ou fallback para execute
    const executeMethod = typeof sqliteConnection.executeAsync === 'function' ? 'executeAsync' : 'execute';
    console.log('Using execute method:', executeMethod);

    const result: any = await (sqliteConnection as any)[executeMethod]('SELECT count(*) as total FROM hardware');
    console.log('Passo 1 Result:', JSON.stringify(result));

    let hardwareCount = 0;
    if (result && result.rows) {
      if (Array.isArray(result.rows)) {
        hardwareCount = result.rows[0]?.total ?? 0;
      } else if (result.rows._array) {
        hardwareCount = result.rows._array[0]?.total ?? 0;
      }
    } else if (Array.isArray(result)) {
      hardwareCount = result[0]?.total ?? 0;
    }

    if (hardwareCount > 0) {
      console.log('🌱 Seed pulado: Banco de dados já populado.');
      return;
    }

    console.log('🌱 Seed passo 2: Inserindo hardwares (RAW SQL)');
    for (const item of HARDWARE_SEED_DATA) {
      await (sqliteConnection as any)[executeMethod](
        'INSERT INTO hardware (nome, descricao, imagem_path) VALUES (?, ?, ?)',
        [item.nome, item.descricao, item.imagemPath]
      );
    }
    
    console.log('🌱 Seed passo 3: Buscando hardware recém-inserido');
    const gabResult: any = await (sqliteConnection as any)[executeMethod]("SELECT id FROM hardware WHERE nome = 'Gabinete (Case)' LIMIT 1");
    
    let gabineteId = null;
    if (gabResult && gabResult.rows) {
      if (Array.isArray(gabResult.rows)) gabineteId = gabResult.rows[0]?.id;
      else if (gabResult.rows._array) gabineteId = gabResult.rows._array[0]?.id;
    } else if (Array.isArray(gabResult)) {
      gabineteId = gabResult[0]?.id;
    }

    console.log('🌱 Seed passo 4: Inserindo Modelo AR');
    const modInsert: any = await (sqliteConnection as any)[executeMethod](
      'INSERT INTO modelo_ar (nome, descricao, qr_code_path, modelo_3d_path, hardware_id) VALUES (?, ?, ?, ?, ?)',
      [MODELO_AR_SEED.nome, MODELO_AR_SEED.descricao, MODELO_AR_SEED.qrCodePath, MODELO_AR_SEED.modelo3dPath, gabineteId]
    );
    
    console.log('🌱 Seed passo 5: Buscando ID Modelo AR. modInsert=', JSON.stringify(modInsert));
    let insertedModeloId = modInsert?.insertId;
    if (!insertedModeloId) {
      const fallbackQuery: any = await (sqliteConnection as any)[executeMethod]('SELECT max(id) as id FROM modelo_ar');
      if (fallbackQuery && fallbackQuery.rows) {
        if (Array.isArray(fallbackQuery.rows)) insertedModeloId = fallbackQuery.rows[0]?.id;
        else if (fallbackQuery.rows._array) insertedModeloId = fallbackQuery.rows._array[0]?.id;
      } else if (Array.isArray(fallbackQuery)) {
        insertedModeloId = fallbackQuery[0]?.id;
      }
    }

    if (!insertedModeloId) {
       throw new Error('Falha ao obter o ID do Modelo AR recém inserido.');
    }

    console.log('🌱 Seed passo 6: Inserindo camadas');
    for (const camada of CAMADAS_SEED) {
      await (sqliteConnection as any)[executeMethod](
        'INSERT INTO camada_modelo (modelo_ar_id, nome, mesh_id, ordem_remocao, visivel_por_padrao) VALUES (?, ?, ?, ?, ?)',
        [insertedModeloId, camada.nome, camada.meshId, camada.ordemRemocao, camada.visivelPorPadrao ? 1 : 0]
      );
    }

    console.log('🌱 Seed passo 7: Inserindo estados');
    for (const estado of ESTADOS_SEED) {
      await (sqliteConnection as any)[executeMethod](
        'INSERT INTO estado_simulacao (modelo_ar_id, nome, animacao_id) VALUES (?, ?, ?)',
        [insertedModeloId, estado.nome, estado.animacaoId]
      );
    }

    console.log('✅ Seed concluído com sucesso!');
  } catch (error: any) {
    console.error('❌ Erro durante a execução do Seed (RAW SQL):', error.message);
    console.error(error.stack);
  }
}
