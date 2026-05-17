import express from 'express';

import plantasRoutes from './modules/plantas/plantas.routes.js';
import { pl } from 'zod/locales';

const app = express();

app.use(express.json());

app.use('/api/plantas',plantasRoutes);

app.get('/',(req, res)=>{
    res.json({message: "Bienvenido a la API dedicada a las plantas"})
});

export default app;