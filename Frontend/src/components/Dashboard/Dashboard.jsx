import { useState } from 'react';
import './Dashboard.scss';
import { LuLayoutDashboard, LuPlus, LuHistory, LuSettings, LuDroplet, LuHeart } from "react-icons/lu";

const Dashboard = ({ onLogout }) => {
    const [currentView, setCurrentView] = useState('resumen');

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

                <div className="dashboard-content">
                    
                    {currentView === 'resumen' && (
                        <>
                            <section className="stats-grid">
                                <div className="stat-card">
                                    <LuLayoutDashboard size={24} className="stat-icon-svg" />
                                    <div className="stat-info">
                                        <h4>Total Plantas</h4>
                                        <p className="stat-number">12</p>
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

                            <section className="plants-section">
                                <div className="section-header">
                                    <h2>Mis Plantas Registradas</h2>
                                    <p className="section-subtitle">Gestiona y monitorea el estado de tus plantas en tiempo real.</p>
                                </div>
                                <div className="plants-table-container">
                                    [Aquí conectarás el componente para listar tus plantas desde la base de datos]
                                </div>
                            </section>
                        </>
                    )}

                    {/* VISTA 2: FORMULARIO DE AGREGAR PLANTA */}
                    {currentView === 'agregar' && (
                        <section className="plants-section">
                            <div className="section-header">
                                <h2>Agregar Nueva Planta 🌱</h2>
                                <p className="section-subtitle">Introduce los datos de la planta para guardarla en PostgreSQL.</p>
                            </div>
                            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                [Aquí crearemos el formulario de registro de plantas]
                            </div>
                        </section>
                    )}

                    {/* VISTA 3: HISTORIAL */}
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
                    dsad
                </div>
            </main>
        </div>
    );
};

export default Dashboard;