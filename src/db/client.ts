import { open } from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';
import * as schema from './schema';

/**
 * Instância da conexão SQLite nativa local (rardware.db)
 */
export const sqliteConnection = open({
  name: 'rardware.db',
});

/**
 * Cliente Drizzle ORM Type-Safe com os schemas do projeto
 */
export const db = drizzle(sqliteConnection, { schema });

/**
 * Inicializa o banco de dados criando as tabelas relacionais se ainda não existirem
 * e habilitando o suporte a chaves estrangeiras.
 */
export async function initDatabase(): Promise<void> {
  // Habilita integridade referencial de Foreign Keys
  sqliteConnection.execute('PRAGMA foreign_keys = ON;');

  // DDLs de criação de tabelas
  const createTablesStatements = [
    `CREATE TABLE IF NOT EXISTS hardware (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      imagem_path TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP)
    );`,

    `CREATE TABLE IF NOT EXISTS modelo_ar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      descricao TEXT,
      qr_code_path TEXT NOT NULL,
      modelo_3d_path TEXT NOT NULL,
      hardware_id INTEGER,
      FOREIGN KEY (hardware_id) REFERENCES hardware (id) ON DELETE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS camada_modelo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo_ar_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      mesh_id TEXT NOT NULL,
      ordem_remocao INTEGER NOT NULL,
      visivel_por_padrao INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (modelo_ar_id) REFERENCES modelo_ar (id) ON DELETE CASCADE
    );`,

    `CREATE TABLE IF NOT EXISTS estado_simulacao (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      modelo_ar_id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      animacao_id TEXT,
      FOREIGN KEY (modelo_ar_id) REFERENCES modelo_ar (id) ON DELETE CASCADE
    );`,
  ];

  for (const statement of createTablesStatements) {
    sqliteConnection.execute(statement);
  }
}
