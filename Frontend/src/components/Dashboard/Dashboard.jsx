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
                <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
                    <h2 style={{ color: '#333', marginTop: 0 }}>¡Conexión Exitosa! 🎉</h2>
                    <p style={{ color: '#555', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
                        Tu sistema de autenticación está validando los tokens correctamente mediante JWT. El backend y el frontend ya se comunican sin interferencias.
                    </p>

                    <div style={{ border: '2px dashed #a5d6a7', backgroundColor: '#e8f5e9', padding: '2rem', borderRadius: '8px', color: '#2e7d32', fontWeight: '500' }}>
                        El siguiente paso es crear el componente para listar tus plantas desde la base de datos PostgreSQL.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;