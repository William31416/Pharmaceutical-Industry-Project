import { Router } from 'express';
import { DataAnalysisController } from '../controllers/dataAnalysisController';

const router = Router();

router.get('/treatments', DataAnalysisController.filterTreatments);
router.get('/statistics', DataAnalysisController.generateStatistics);
router.post('/export', DataAnalysisController.exportDataCSV);

export default router;