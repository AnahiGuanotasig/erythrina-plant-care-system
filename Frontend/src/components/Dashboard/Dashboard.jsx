import './Dashboard.scss';

const Dashboard = ({ onLogout }) => {
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
                <div className="sidebar">
                    <div className="sidebar-brand">
                        <h3>Menú Principal</h3>
                    </div>

                    <ul className="sidebar-menu">
                        <li className="menu-item">
                            <span className="icon">➕</span> Agregar Planta
                        </li>
                        <li className="menu-item">
                            <span className="icon">📋</span> Ver Historial
                        </li>
                        <li className="menu-item">
                            <span className="icon">⚙️</span> Configuración
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">

                    {/* 1. SECCIÓN DE TARJETAS ESTADÍSTICAS */}
                    <section className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-icon">🌱</span>
                            <div className="stat-info">
                                <h4>Total Plantas</h4>
                                <p className="stat-number">12</p>
                            </div>
                        </div>
                        <div className="stat-card alert">
                            <span className="stat-icon">💧</span>
                            <div className="stat-info">
                                <h4>Por Regar</h4>
                                <p className="stat-number">3</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">❤️</span>
                            <div className="stat-info">
                                <h4>Salud Global</h4>
                                <p className="stat-number">100%</p>
                            </div>
                        </div>
                    </section>

                    {/* 2. SECCIÓN DE LA LISTA / TABLA DE PLANTAS */}
                    <section className="plants-section">
                        <div className="section-header">
                            <h2>Mis Plantas Registradas</h2>
                            <p className="section-subtitle">Gestiona y monitorea el estado de tus plantas en tiempo real.</p>
                        </div>

                        {/* Aquí irá tu mapeo ( .map() ) de plantas desde PostgreSQL */}
                        <div className="plants-table-container">
                            {/* Ejemplo de estructura de tabla o tarjetas */}
                            <p style={{ color: '#666' }}>[Aquí conectarás el componente para listar tus plantas desde la base de datos]</p>
                        </div>
                    </section>

                </div>

            </main>
        </div>
    );
};

export default Dashboard;