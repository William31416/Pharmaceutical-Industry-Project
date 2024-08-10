import { Request, Response } from 'express';
import { AnalisisDatosDAO } from '../data-access/dataAnalysis';

export class DataAnalysisController {
    static async filterTreatments(req: Request, res: Response): Promise<void> {
        try {
            const { medicationId, frequency, duration } = req.query;
            const treatments = await AnalisisDatosDAO.filterTreatments(
                Number(medicationId),
                String(frequency),
                Number(duration)
            );
            res.status(200).json(treatments);
        } catch (error) {
            res.status(500).send('Error filtering treatments');
        }
    }

    static async generateStatistics(req: Request, res: Response): Promise<void> {
        try {
            const statistics = await AnalisisDatosDAO.generateStatistics();
            res.status(200).json(statistics);
        } catch (error) {
            res.status(500).send('Error generating statistics');
        }
    }

    static async exportDataCSV(req: Request, res: Response): Promise<void> {
        try {
            const { dataType } = req.query;
            const filePath = `./exports/${dataType}.csv`; // Ensure the directory exists

            let data;
            if (dataType === 'treatments') {
                data = await AnalisisDatosDAO.filterTreatments(
                    Number(req.query.medicationId),
                    String(req.query.frequency),
                    Number(req.query.duration)
                );
            } else if (dataType === 'statistics') {
                data = await AnalisisDatosDAO.generateStatistics();
            } else {
                res.status(400).send('Invalid data type');
                return;
            }

            await AnalisisDatosDAO.exportDataCSV(data, filePath);
            res.status(200).send('Data exported successfully');
        } catch (error) {
            res.status(500).send('Error exporting data to CSV');
        }
    }
}