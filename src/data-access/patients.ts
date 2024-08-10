import { Patient } from "../interfaces/patient";
import { Prescription } from "../interfaces/prescription";
import pool from "../config/database";

export class RegistroPacientes {
    // Registrar un nuevo paciente
    static async registerPatient(patient: Patient): Promise<void> {
        const query = 'INSERT INTO pacientes (nombre, edad, historial_medico) VALUES (?, ?, ?)';
        const values = [patient.nombre, patient.edad, patient.historial_medico || null];
        try {
            await pool.execute(query, values);
            console.log('Paciente registrado con éxito.');
        } catch (error) {
            console.error('Error al registrar paciente:', error);
            throw error;
        }
    }

    // Añadir una prescripción para un paciente
    static async addPrescription(patientId: number, prescription: Prescription): Promise<void> {
        const query = 'INSERT INTO prescripciones (paciente_id, medicamento_id, dosis, frecuencia, duracion) VALUES (?, ?, ?, ?, ?)';
        const values = [patientId, prescription.medicamento_id, prescription.dosis, prescription.frecuencia, prescription.duracion];
        try {
            await pool.execute(query, values);
            console.log('Prescripción añadida con éxito.');
        } catch (error) {
            console.error('Error al añadir prescripción:', error);
            throw error;
        }
    }

    // Listar todas las prescripciones de un paciente
    static async listPrescriptions(patientId: number): Promise<Prescription[]> {
        const query = 'SELECT * FROM prescripciones WHERE paciente_id = ?';
        try {
            const [rows] = await pool.execute(query, [patientId]);
            return rows as Prescription[];
        } catch (error) {
            console.error('Error al listar prescripciones:', error);
            throw error;
        }
    }

    // Verificar disponibilidad de un medicamento
    static async checkMedicationAvailability(medicationId: number): Promise<boolean> {
        const query = 'SELECT cantidad FROM medicamentos WHERE id = ?';
        try {
            const [rows] = await pool.execute(query, [medicationId]);
            const medication = (rows as any)[0];
            return medication && medication.cantidad > 0;
        } catch (error) {
            console.error('Error al verificar disponibilidad del medicamento:', error);
            throw error;
        }
    }
}