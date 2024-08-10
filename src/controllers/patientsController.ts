import { Request, Response } from 'express';
import { RegistroPacientes } from '../data-access/patients';
import { Patient } from '../interfaces/patient';
import { Prescription } from '../interfaces/prescription';

export class PatientsController {
    static async registerPatient(req: Request, res: Response): Promise<void> {
        try {
            const patient: Patient = req.body;
            await RegistroPacientes.registerPatient(patient);
            res.status(201).send('Patient registered successfully');
        } catch (error) {
            res.status(500).send('Error registering patient');
        }
    }

    static async addPrescription(req: Request, res: Response): Promise<void> {
        try {
            const { patientId } = req.params;
            const prescription: Prescription = req.body;
            if (await RegistroPacientes.checkMedicationAvailability(prescription.medicamento_id)) {
                await RegistroPacientes.addPrescription(Number(patientId), prescription);
                res.status(201).send('Prescription added successfully');
            } else {
                res.status(400).send('Medication not available');
            }
        } catch (error) {
            res.status(500).send('Error adding prescription');
        }
    }

    static async listPrescriptions(req: Request, res: Response): Promise<void> {
        try {
            const { patientId } = req.params;
            const prescriptions = await RegistroPacientes.listPrescriptions(Number(patientId));
            res.status(200).json(prescriptions);
        } catch (error) {
            res.status(500).send('Error listing prescriptions');
        }
    }
}