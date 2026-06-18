import { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Typography, Alert } from '@mui/material';
import { createPlanta, plantasTipos, plantasEstados } from '../../services/plantas.service';

const tamanioOpciones = [
    { value: 'Pequeña', label: 'Pequeña' },
    { value: 'Mediana', label: 'Mediana' },
    { value: 'Grande', label: 'Grande' },
];

const estadoOpciones = [
    { value: 'Saludable', label: 'Saludable' },
    { value: 'En observacion', label: 'En observación' },
    { value: 'Necesita atencion', label: 'Necesita atención' },
    { value: 'Enferma', label: 'Enferma' },
];

const AddPlant = ({ user, onPlantAdded }) => {
    const [nombrePlanta, setNombrePlanta] = useState('');
    const [tipoPlanta, setTipoPlanta] = useState('');
    const [tiposPlantas, setTiposPlantas] = useState([]);
    const [tamanioPlanta, setTamanioPlanta] = useState('Mediana');
    const [intervaloRiego, setIntervaloRiego] = useState(3);
    const [estadosPlantas, setEstadosPlantas] = useState([]);
    const [fechaPlantacion, setFechaPlantacion] = useState(new Date().toISOString().slice(0, 10));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const loadTipos = async () => {
            try {
                const tipos = await plantasTipos();
                setTiposPlantas(Array.isArray(tipos) ? tipos : []);
                if (Array.isArray(tipos) && tipos.length > 0) {
                    setTipoPlanta(tipos[0].id);
                }
            } catch (err) {
                console.error('Error cargando tipos de plantas:', err);
                setError('No se pudieron cargar los tipos de plantas. Intenta recargar la página.');
            }
        };

        loadTipos();
    }, []);

    useEffect(() => {
        const loadEstados = async () => {
            try {
                const estados = await plantasEstados();
                setEstadosPlantas(Array.isArray(estados) ? estados : []);
                if (Array.isArray(estados) && estados.length > 0) {
                    setEstadosPlantas(estados[0].id);
                }
            } catch (err) {
                console.error('Error cargando estados de plantas:', err);
                setError('No se pudieron cargar los estados de plantas. Intenta recargar la página.');
            }
        };

        loadEstados();
    }, []);
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        const userId = typeof user === 'object' && user?.id ? user.id : user;
        if (!userId) {
            setError('No se encontró el usuario. Inicia sesión nuevamente.');
            return;
        }

        if (!nombrePlanta.trim()) {
            setError('Debes ingresar un nombre para la planta.');
            return;
        }

        if (!tipoPlanta) {
            setError('Debes seleccionar un tipo de planta.');
            return;
        }

        if (intervaloRiego <= 0) {
            setError('La frecuencia de riego debe ser un número mayor a cero.');
            return;
        }

        setLoading(true);

        try {
            await createPlanta({
                id_usuario: userId,
                nombre_planta: nombrePlanta.trim(),
                id_tipo: Number(tipoPlanta),
                tamanio_planta: tamanioPlanta,
                intervalo_riego_dias: Number(intervaloRiego),
                id_estado: Number(estadosPlantas),
                fecha_plantacion: fechaPlantacion,
            });

            setSuccess('La planta se agregó correctamente.');
            setNombrePlanta('');
            setTipoPlanta(tiposPlantas.length > 0 ? tiposPlantas[0].id : '');
            setTamanioPlanta('Mediana');
            setIntervaloRiego(3);
            setEstadosPlantas(estadosPlantas.length > 0 ? estadosPlantas[0].id : '');
            setFechaPlantacion(new Date().toISOString().slice(0, 10));

            if (typeof onPlantAdded === 'function') {
                onPlantAdded();
            }
        } catch (err) {
            console.error('Error al agregar planta:', err);
            const message = err.response?.data?.message || 'No se pudo guardar la planta. Intenta nuevamente.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3, maxWidth: 720 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                Agregar Nueva Planta 🌱
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Completa los datos de tu planta para agregarla a tu colección y programar su seguimiento.
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                    label="Nombre de la planta"
                    value={nombrePlanta}
                    onChange={(e) => setNombrePlanta(e.target.value)}
                    required
                    fullWidth
                />
                <TextField
                    select
                    label="Tipo de planta"
                    value={tipoPlanta}
                    onChange={(e) => setTipoPlanta(e.target.value)}
                    fullWidth
                >
                    {tiposPlantas.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.tipo}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                    select
                    label="Tamaño"
                    value={tamanioPlanta}
                    onChange={(e) => setTamanioPlanta(e.target.value)}
                    fullWidth
                >
                    {tamanioOpciones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Intervalo de riego (días)"
                    type="number"
                    inputProps={{ min: 1 }}
                    value={intervaloRiego}
                    onChange={(e) => setIntervaloRiego(Number(e.target.value))}
                    required
                    fullWidth
                />
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                    select
                    label="Estado actual"
                    value={estadosPlantas}
                    onChange={(e) => setEstadosPlantas(Number(e.target.value))}
                    fullWidth
                >
                    {estadoOpciones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Fecha de plantación"
                    type="date"
                    value={fechaPlantacion}
                    onChange={(e) => setFechaPlantacion(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={loading}
                sx={{ py: 1.8, borderRadius: '10px', fontWeight: 'bold' }}
            >
                {loading ? 'Guardando planta...' : 'Guardar planta'}
            </Button>
        </Box>
    );
};

export default AddPlant;
