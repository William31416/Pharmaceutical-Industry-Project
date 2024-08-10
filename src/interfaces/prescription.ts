export interface Prescription {
    id: number;
    paciente_id: number;
    medicamento_id: number;
    dosis: string;
    frecuencia: string;
    duracion: number;
}