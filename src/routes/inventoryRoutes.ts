import { Router } from 'express';
import { InventoryController } from '../controllers/inventoryController';

const router = Router();

router.post('/medications', InventoryController.addMedication);
router.put('/medications/:id', InventoryController.updateQuantity);
router.delete('/medications/expired', InventoryController.removeExpiredMedications);
router.get('/medications', InventoryController.listMedications);

export default router;