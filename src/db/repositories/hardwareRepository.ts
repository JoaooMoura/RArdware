import { sqliteConnection } from '../client';
import type { Hardware } from '../schema';

/**
 * Busca todos os componentes de hardware cadastrados no banco, em ordem alfabética.
 */
export async function getHardwares(): Promise<Hardware[]> {
  try {
    const executeMethod = typeof sqliteConnection.executeAsync === 'function' ? 'executeAsync' : 'execute';
    const result: any = await (sqliteConnection as any)[executeMethod]('SELECT * FROM hardware ORDER BY nome ASC');
    
    if (result && result.rows) {
      if (Array.isArray(result.rows)) {
        return result.rows as Hardware[];
      } else if (result.rows._array) {
        return result.rows._array as Hardware[];
      }
    } else if (Array.isArray(result)) {
      return result as Hardware[];
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar hardwares no DB:', error);
    throw new Error('Não foi possível carregar o catálogo de peças.');
  }
}
