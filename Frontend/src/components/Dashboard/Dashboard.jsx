import { useState, useEffect } from 'react';
import './Dashboard.scss';
import { LuLayoutDashboard, LuPlus, LuHistory, LuSettings, LuDroplet, LuHeart } from "react-icons/lu";
import { createPlanta, getPlantasByUser } from '../../services/plantas.service'; // Tu servicio de API

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Typography, Chip
} from '@mui/material';

const Dashboard = ({ user, onLogout }) => {
    const [currentView, setCurrentView] = useState('resumen');

    const [plantas, setPlantas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerPlantas = async () => {
        try {
            setCargando(true);
            const userId = typeof user === 'object' && user?.id ? user.id : user;
            if (!userId) {
                setPlantas([]);
                setCargando(false);
                return;
            }
            const data = await getPlantasByUser(userId);
            setPlantas(Array.isArray(data) ? data : []);
            setCargando(false);
        } catch (error) {
            console.error("Error al obtener plantas de la BD:", error);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerPlantas();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header-text">
                    <h1>Erythrina</h1>
                    <p>Panel de Control de Plantas</p>
                </div>
                <button
                    onClick={onLogout}
                    style={{
                        padding: '0.6rem 1.2rem',
                        backgroundColor: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#b71c1c'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#d32f2f'}
                >
                    Cerrar Sesión
                </button>
            </header>

            <main>
                {/* MENÚ LATERAL */}
                <div className="sidebar">
                    <div className="sidebar-brand">
                        <h3>Menú Principal</h3>
                    </div>

                    <ul className="sidebar-menu">
                        <li
                            className={`menu-item ${currentView === 'resumen' ? 'active' : ''}`}
                            onClick={() => setCurrentView('resumen')}
                        >
                            <LuLayoutDashboard className="icon" /> Resumen General
                        </li>

                        <li
                            className={`menu-item ${currentView === 'agregar' ? 'active' : ''}`}
                            onClick={() => setCurrentView('agregar')}
                        >
                            <LuPlus className="icon" /> Agregar Planta
                        </li>

                        <li
                            className={`menu-item ${currentView === 'historial' ? 'active' : ''}`}
                            onClick={() => setCurrentView('historial')}
                        >
                            <LuHistory className="icon" /> Ver Historial
                        </li>

                        <li
                            className={`menu-item ${currentView === 'config' ? 'active' : ''}`}
                            onClick={() => setCurrentView('config')}
                        >
                            <LuSettings className="icon" /> Configuración
                        </li>
                    </ul>
                </div>

                {/* CONTENEDOR CONTENIDO DINÁMICO */}
                <div className="dashboard-content">

                    {/* VISTA 1: RESUMEN GENERAL (Tarjetas y Tabla MUI) */}
                    {currentView === 'resumen' && (
                        <>
                            <section className="stats-grid">
                                <div className="stat-card">
                                    <LuLayoutDashboard size={24} className="stat-icon-svg" />
                                    <div className="stat-info">
                                        <h4>Total Plantas</h4>
                                        <p className="stat-number">{plantas.length}</p>
                                    </div>
                                </div>

                                <div className="stat-card alert">
                                    <LuDroplet size={24} className="stat-icon-svg" />
                                    <div className="stat-info">
                                        <h4>Por Regar</h4>
                                        <p className="stat-number">3</p>
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <LuHeart size={24} className="stat-icon-svg" />
                                    <div className="stat-info">
                                        <h4>Salud Global</h4>
                                        <p className="stat-number">100%</p>
                                    </div>
                                </div>
                            </section>

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#2e7d32' }}>
                                    Mis Plantas Registradas
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                                    Gestiona y monitorea el estado de tus plantas en tiempo real desde PostgreSQL.
                                </Typography>

                                {/* 📊 TABLA DE MATERIAL UI */}
                                <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Planta</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Especie</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Ubicación</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Frecuencia</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {cargando ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                                        Cargando plantas desde el servidor... ⏳
                                                    </TableCell>
                                                </TableRow>
                                            ) : plantas.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                                        No tienes plantas registradas aún. ¡Haz clic en "Agregar Planta"! 🌱
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                plantas.map((planta) => (
                                                    <TableRow key={planta.id} hover>
                                                        <TableCell sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                                            🌿 {planta.nombre}
                                                        </TableCell>
                                                        <TableCell>{planta.especie || 'No especificada'}</TableCell>
                                                        <TableCell>
                                                            <Chip label={planta.ubicacion} color="primary" variant="outlined" size="small" />
                                                        </TableCell>
                                                        <TableCell>Cada {planta.frecuencia_riego} días</TableCell>
                                                        <TableCell>
                                                            <Chip label="Saludable" color="success" size="small" />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </>
                    )}

                    {currentView === 'agregar' && (
                        <Box sx={{ p: 1 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#2e7d32' }}>
                                Agregar Nueva Planta 🌱
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                                Introduce los datos de la planta para guardarla en PostgreSQL.
                            </Typography>

                            <Box
                                component="form"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const formElement = e.target;

                                    const userId = typeof user === 'object' && user?.id ? user.id : user;
                                    const data = {
                                        nombre: formElement.nombre.value,
                                        especie: formElement.especie.value,
                                        frecuencia_riego: parseInt(formElement.frecuencia_riego.value, 10),
                                        ubicacion: formElement.ubicacion.value,
                                        id_usuario: userId
                                    };

                                    try {
                                        const nuevaPlanta = await createPlanta(data);
                                        if (nuevaPlanta) {
                                            alert("¡Planta guardada con éxito en PostgreSQL!");
                                            obtenerPlantas(); // Forzar actualización de la tabla
                                            setCurrentView('resumen'); // Redirigir automáticamente
                                        }
                                    } catch (error) {
                                        console.error("Error al guardar planta:", error);
                                        alert("Error al intentar comunicarse con el servidor.");
                                    }
                                }}
                            >
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, mb: 4 }}>
                                    <TextField name="nombre" label="Nombre Común" variant="outlined" fullWidth required />
                                    <TextField name="especie" label="Especie / Nombre Científico" variant="outlined" fullWidth />
                                    <TextField name="frecuencia_riego" label="Frecuencia de Riego (Días)" type="number" variant="outlined" fullWidth required />

                                    <FormControl fullWidth>
                                        <InputLabel id="ubicacion-label">Ubicación</InputLabel>
                                        <Select name="ubicacion" labelId="ubicacion-label" defaultValue="Interior" label="Ubicación">
                                            <MenuItem value="Interior">Interior</MenuItem>
                                            <MenuItem value="Exterior">Exterior</MenuItem>
                                            <MenuItem value="Balcón">Balcón</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    startIcon={<LuPlus />}
                                    sx={{ fontWeight: 'bold', px: 4, py: 1.2, borderRadius: '8px', backgroundColor: '#2e7d32' }}
                                >
                                    Guardar Planta
                                </Button>
                            </Box>
                        </Box>
                    )}

                    {currentView === 'historial' && (
                        <section className="plants-section">
                            <h2>Historial de Actividades</h2>
                            <p>Próximamente...</p>
                        </section>
                    )}

                    {currentView === 'config' && (
                        <section className="plants-section">
                            <h2>Configuración del Sistema</h2>
                            <p>Próximamente...</p>
                        </section>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;