import { createObjectCsvWriter } from 'csv-writer';
import pool from '../config/database';
import { Prescription } from '../interfaces/prescription';

export class AnalisisDatosDAO {
    // Filtrar tratamientos por medicamento, frecuencia y duración
    static async filterTreatments(medicationId: number, frequency: string, duration: number): Promise<Prescription[]> {
        const query = 'SELECT * FROM prescripciones WHERE medicamento_id = ? AND frecuencia = ? AND duracion = ?';
        try {
            const [rows] = await pool.execute(query, [medicationId, frequency, duration]);
            return rows as Prescription[];
        } catch (error) {
            console.error('Error al filtrar tratamientos:', error);
            throw error;
        }
    }

    // Generar estadísticas sobre el uso de medicamentos
    static async generateStatistics(): Promise<{ medicamento_id: number; total_dosis: number }[]> {
        const query = 'SELECT medicamento_id, COUNT(*) AS total_dosis FROM prescripciones GROUP BY medicamento_id';
        try {
            const [rows] = await pool.execute(query);
            return rows as { medicamento_id: number; total_dosis: number }[];
        } catch (error) {
            console.error('Error al generar estadísticas:', error);
            throw error;
        }
    }

    // Exportar datos a CSV
    static async exportDataCSV(data: Prescription[] | { medicamento_id: number; total_dosis: number }[], filePath: string): Promise<void> {
        if (data.length === 0) {
            throw new Error('No hay datos para exportar');
        }

        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
        });

        try {
            await csvWriter.writeRecords(data);
            console.log('Datos exportados a CSV exitosamente.');
        } catch (error) {
            console.error('Error al exportar datos a CSV:', error);
            throw error;
        }
    }
}