import { Request, Response } from 'express';
import { Inventory } from '../data-access/inventory';
import { Medication } from '../interfaces/medication';

export class InventoryController {
    static async addMedication(req: Request, res: Response): Promise<void> {
        try {
            const medication: Medication = req.body;
            await Inventory.addMedication(medication);
            res.status(201).send('Medication added successfully');
        } catch (error) {
            res.status(500).send('Error adding medication');
        }
    }

    static async updateQuantity(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { cantidad } = req.body;  // Cambiar a req.body para obtener el valor de cantidad
            await Inventory.updateQuantity(id, Number(cantidad));
            res.status(200).send('Quantity updated successfully');
        } catch (error) {
            console.error('Error updating quantity:', error); // Añade logging para depuración
            res.status(500).send('Error updating quantity');
        }
    }
    

    static async removeExpiredMedications(req: Request, res: Response): Promise<void> {
        try {
            await Inventory.removeExpiredMedications();
            res.status(200).send('Expired medications removed successfully');
        } catch (error) {
            res.status(500).send('Error removing expired medications');
        }
    }

    static async listMedications(req: Request, res: Response): Promise<void> {
        try {
            const medications = await Inventory.listMedications();
            res.status(200).json(medications);
        } catch (error) {
            res.status(500).send('Error listing medications');
        }
    }
}