import { Router } from 'express';
import { PatientsController } from '../controllers/patientsController';

const router = Router();

router.post('/', PatientsController.registerPatient);
router.post('/:patientId/prescriptions', PatientsController.addPrescription);
router.get('/:patientId/prescriptions', PatientsController.listPrescriptions);

export default router;