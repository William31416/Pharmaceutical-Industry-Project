import { Medication } from "../interfaces/medication";
import pool from "../config/database";

export class Inventory {
    // Agregar un nuevo medicamento
    static async addMedication(medication: Medication): Promise<void> {
        const query = 'INSERT INTO medicamentos (nombre, cantidad, fecha_de_caducidad, precio) VALUES (?, ?, ?, ?)';
        const values = [medication.nombre, medication.cantidad, medication.fecha_de_caducidad, medication.precio];
        try {
            await pool.execute(query, values);
            console.log('Medicamento agregado con éxito.');
        } catch (error) {
            console.error('Error al agregar medicamento:', error);
            throw error;
        }
    }

    // Actualizar la cantidad de un medicamento
    static async updateQuantity(id: number, quantity: number): Promise<void> {
        const query = 'UPDATE medicamentos SET cantidad = ? WHERE id = ?';
        try {
            await pool.execute(query, [quantity, id]);
            console.log('Cantidad actualizada con éxito.');
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw error;
        }
    }

    // Eliminar medicamentos caducados
    static async removeExpiredMedications(): Promise<void> {
        const query = 'DELETE FROM medicamentos WHERE fecha_de_caducidad < NOW()';
        try {
            await pool.execute(query);
            console.log('Medicamentos caducados eliminados con éxito.');
        } catch (error) {
            console.error('Error al eliminar medicamentos caducados:', error);
            throw error;
        }
    }

    // Listar todos los medicamentos
    static async listMedications(): Promise<Medication[]> {
        const query = 'SELECT * FROM medicamentos';
        try {
            const [rows] = await pool.execute(query);
            return rows as Medication[];
        } catch (error) {
            console.error('Error al listar medicamentos:', error);
            throw error;
        }
    }
}