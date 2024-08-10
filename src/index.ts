import express from 'express';
import dotenv from 'dotenv';
import inventoryRoutes from './routes/inventoryRoutes';
import patientsRoutes from './routes/patientsRoutes';
import dataAnalysisRoutes from './routes/dataAnalysisRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/inventory', inventoryRoutes);
app.use('/patients', patientsRoutes);
app.use('/data-analysis', dataAnalysisRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
