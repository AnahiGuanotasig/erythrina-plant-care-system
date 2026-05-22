import express from 'express';

import plantasRoutes from './modules/plantas/plantas.routes.js';
import historialPlantasRoutes from './modules/historial_plantas/historial_plantas.routes.js';
import usersRoutes from './modules/users/users.routes.js'

const app = express();

app.use(express.json());

app.use('/api/plantas',plantasRoutes);
app.use('/api/historial_plantas', historialPlantasRoutes);
app.use('/api/users',usersRoutes);

app.get('/',(req, res)=>{
    res.json({message: "Bienvenido a la API dedicada al sistema de gestion de las plantas"})
});

export default app;