import { useState, useEffect, useCallback, useMemo } from 'react';
import './Dashboard.scss';
import { LuLayoutDashboard, LuPlus, LuHistory, LuSettings, LuDroplet, LuHeart } from "react-icons/lu";
import { getPlantasByUser } from '../../services/plantas.service';
import AddPlant from '../AddPlant/AddPlant';

import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Box, Typography, Chip
} from '@mui/material';

const Dashboard = ({ user, onLogout }) => {
    const [currentView, setCurrentView] = useState('resumen');

    const [plantas, setPlantas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const estadoCounts = useMemo(() => {
        let saludables = 0;
        let enObservacion = 0;
        let enfermas = 0;

        const normalize = (value) =>
            `${value || ''}`
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .toLowerCase()
                .trim();

        plantas.forEach((planta) => {
            const estado = normalize(planta.estado_actual).replace(/\s+/g, ' ');

            if (estado === 'saludable') {
                saludables++;
            } else if (
                estado.includes('advertencia') ||
                estado.includes('en observacion') ||
                estado.includes('observacion')
            ) {
                enObservacion++;
            } else if (
                estado.includes('necesita atencion') ||
                estado.includes('enferma') ||
                estado.includes('enfermo') ||
                estado.includes('con estres') ||
                estado.includes('estres')
            ) {
                enfermas++;
            }
        });

        return {
            saludables,
            enObservacion,
            enfermas,
        };
    }, [plantas]);

    const obtenerPlantas = useCallback(async (userId) => {
        try {
            setCargando(true);
            if (!userId) {
                setPlantas([]);
                setCargando(false);
                return;
            }
            const data = await getPlantasByUser(userId);
            const plantasArray = Array.isArray(data) ? data : [];
            setPlantas(plantasArray);
            setCargando(false);
        } catch (error) {
            console.error("Error al obtener plantas de la BD:", error);
            setCargando(false);
        }
    }, []);

    const getEstadoChipProps = (estadoActual) => {
        const estado = `${estadoActual || ''}`
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
            .trim();

        if (estado === 'saludable') {
            return { label: 'Saludable', color: 'success' };
        }

        if (
            estado.includes('advertencia') ||
            estado.includes('en observacion') ||
            estado.includes('observacion')
        ) {
            return { label: 'En Observación', color: 'warning' };
        }

        if (
            estado.includes('necesita atencion') ||
            estado.includes('enferma') ||
            estado.includes('enfermo') ||
            estado.includes('con estres') ||
            estado.includes('estres')
        ) {
            return { label: 'Enferma / Con Estrés', color: 'error' };
        }

        return { label: estadoActual || 'Desconocido', color: 'default' };
    };

    useEffect(() => {
        const loadPlantas = async () => {
            const userId = typeof user === 'object' && user?.id ? user.id : user;
            await obtenerPlantas(userId);
        };

        if (user) {
            loadPlantas();
        }
    }, [user, obtenerPlantas]);

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

                                <div className="stat-card" style={{ backgroundColor: '#c8e6c9' }}>
                                    <LuHeart size={24} className="stat-icon-svg" style={{ color: '#2e7d32' }} />
                                    <div className="stat-info">
                                        <h4>Saludables</h4>
                                        <p className="stat-number" style={{ color: '#2e7d32' }}>{estadoCounts.saludables}</p>
                                    </div>
                                </div>

                                <div className="stat-card" style={{ backgroundColor: '#fff3e0' }}>
                                    <LuDroplet size={24} className="stat-icon-svg" style={{ color: '#f57c00' }} />
                                    <div className="stat-info">
                                        <h4>En Observación</h4>
                                        <p className="stat-number" style={{ color: '#f57c00' }}>{estadoCounts.enObservacion}</p>
                                    </div>
                                </div>

                                <div className="stat-card" style={{ backgroundColor: '#ffebee' }}>
                                    <LuHeart size={24} className="stat-icon-svg" style={{ color: '#d32f2f' }} />
                                    <div className="stat-info">
                                        <h4>Enfermas/Con Estrés</h4>
                                        <p className="stat-number" style={{ color: '#d32f2f' }}>{estadoCounts.enfermas}</p>
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
                                                <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Tamaño</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Frecuencia</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Fecha de Plantación</TableCell>

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
                                                            🌿 {planta.nombre_planta}
                                                        </TableCell>
                                                        <TableCell>{planta.tipo_planta || 'N/D'}</TableCell>
                                                        <TableCell>{planta.tamanio_planta || 'N/D'}</TableCell>
                                                        <TableCell>Cada {planta.intervalo_riego_dias ?? 'N/D'} días</TableCell>
                                                        <TableCell>
                                                            {(() => {
                                                                const chipProps = getEstadoChipProps(planta.estado_actual);
                                                                return <Chip label={chipProps.label} color={chipProps.color} size="small" />;
                                                            })()}
                                                        </TableCell>
                                                        <TableCell>{new Date(planta.fecha_plantacion).toLocaleDateString()}</TableCell>
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
                        <AddPlant user={user} onPlantAdded={async () => {
                            const userId = typeof user === 'object' && user?.id ? user.id : user;
                            await obtenerPlantas(userId);
                            setCurrentView('resumen');
                        }} />
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