import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

/**
 * Tabela de Componentes Físicos de Hardware
 */
export const hardware = sqliteTable('hardware', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  descricao: text('descricao').notNull(),
  imagemPath: text('imagem_path').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

/**
 * Tabela de Modelos 3D e Marcadores de Realidade Aumentada
 */
export const modeloAr = sqliteTable('modelo_ar', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  nome: text('nome').notNull(),
  descricao: text('descricao'),
  qrCodePath: text('qr_code_path').notNull(),
  modelo3dPath: text('modelo_3d_path').notNull(),
  hardwareId: integer('hardware_id').references(() => hardware.id, {
    onDelete: 'cascade',
  }),
});

/**
 * Tabela de Camadas para a Dissecação Interativa (RF02)
 */
export const camadaModelo = sqliteTable('camada_modelo', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  modeloArId: integer('modelo_ar_id')
    .notNull()
    .references(() => modeloAr.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  meshId: text('mesh_id').notNull(),
  ordemRemocao: integer('ordem_remocao').notNull(),
  visivelPorPadrao: integer('visivel_por_padrao', { mode: 'boolean' }).notNull().default(true),
});

/**
 * Tabela de Estados de Simulação do Computador (RF03)
 */
export const estadoSimulacao = sqliteTable('estado_simulacao', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  modeloArId: integer('modelo_ar_id')
    .notNull()
    .references(() => modeloAr.id, { onDelete: 'cascade' }),
  nome: text('nome').notNull(),
  animacaoId: text('animacao_id'),
});

// ==========================================
// Relações Drizzle ORM
// ==========================================

export const hardwareRelations = relations(hardware, ({ many }) => ({
  modelos: many(modeloAr),
}));

export const modeloArRelations = relations(modeloAr, ({ one, many }) => ({
  hardware: one(hardware, {
    fields: [modeloAr.hardwareId],
    references: [hardware.id],
  }),
  camadas: many(camadaModelo),
  estados: many(estadoSimulacao),
}));

export const camadaModeloRelations = relations(camadaModelo, ({ one }) => ({
  modelo: one(modeloAr, {
    fields: [camadaModelo.modeloArId],
    references: [modeloAr.id],
  }),
}));

export const estadoSimulacaoRelations = relations(estadoSimulacao, ({ one }) => ({
  modelo: one(modeloAr, {
    fields: [estadoSimulacao.modeloArId],
    references: [modeloAr.id],
  }),
}));

// ==========================================
// Tipos Inferidos do Schema
// ==========================================

export type Hardware = typeof hardware.$inferSelect;
export type NewHardware = typeof hardware.$inferInsert;

export type ModeloAR = typeof modeloAr.$inferSelect;
export type NewModeloAR = typeof modeloAr.$inferInsert;

export type CamadaModelo = typeof camadaModelo.$inferSelect;
export type NewCamadaModelo = typeof camadaModelo.$inferInsert;

export type EstadoSimulacao = typeof estadoSimulacao.$inferSelect;
export type NewEstadoSimulacao = typeof estadoSimulacao.$inferInsert;
