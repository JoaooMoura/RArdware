import { getTableName } from 'drizzle-orm';
import { initDatabase, sqliteConnection } from '../src/db/client';
import { camadaModelo, estadoSimulacao, hardware, modeloAr } from '../src/db/schema';

describe('Database Schema & Initialization Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Drizzle Schema Definitions', () => {
    test('defines all 4 domain tables with correct SQL table names', () => {
      expect(getTableName(hardware)).toBe('hardware');
      expect(getTableName(modeloAr)).toBe('modelo_ar');
      expect(getTableName(camadaModelo)).toBe('camada_modelo');
      expect(getTableName(estadoSimulacao)).toBe('estado_simulacao');
    });

    test('validates hardware table structure', () => {
      expect(hardware.id).toBeDefined();
      expect(hardware.nome).toBeDefined();
      expect(hardware.descricao).toBeDefined();
      expect(hardware.imagemPath).toBeDefined();
      expect(hardware.createdAt).toBeDefined();
    });

    test('validates modelo_ar table structure and foreign key presence', () => {
      expect(modeloAr.id).toBeDefined();
      expect(modeloAr.nome).toBeDefined();
      expect(modeloAr.qrCodePath).toBeDefined();
      expect(modeloAr.modelo3dPath).toBeDefined();
      expect(modeloAr.hardwareId).toBeDefined();
    });

    test('validates camada_modelo structure for interactive dissection (RF02)', () => {
      expect(camadaModelo.id).toBeDefined();
      expect(camadaModelo.modeloArId).toBeDefined();
      expect(camadaModelo.nome).toBeDefined();
      expect(camadaModelo.meshId).toBeDefined();
      expect(camadaModelo.ordemRemocao).toBeDefined();
      expect(camadaModelo.visivelPorPadrao).toBeDefined();
    });

    test('validates estado_simulacao structure for hardware states (RF03)', () => {
      expect(estadoSimulacao.id).toBeDefined();
      expect(estadoSimulacao.modeloArId).toBeDefined();
      expect(estadoSimulacao.nome).toBeDefined();
      expect(estadoSimulacao.animacaoId).toBeDefined();
    });
  });

  describe('initDatabase() Execution', () => {
    test('executes PRAGMA foreign_keys and all 4 DDL statements on happy path', async () => {
      await initDatabase();

      expect(sqliteConnection.execute).toHaveBeenCalledWith('PRAGMA foreign_keys = ON;');
      expect(sqliteConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE IF NOT EXISTS hardware'),
      );
      expect(sqliteConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE IF NOT EXISTS modelo_ar'),
      );
      expect(sqliteConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE IF NOT EXISTS camada_modelo'),
      );
      expect(sqliteConnection.execute).toHaveBeenCalledWith(
        expect.stringContaining('CREATE TABLE IF NOT EXISTS estado_simulacao'),
      );
    });

    test('propagates error when SQLite execute fails', async () => {
      const mockError = new Error('Disk full / SQLite write failure');
      (sqliteConnection.execute as jest.Mock).mockImplementationOnce(() => {
        throw mockError;
      });

      await expect(initDatabase()).rejects.toThrow('Disk full / SQLite write failure');
    });
  });
});
