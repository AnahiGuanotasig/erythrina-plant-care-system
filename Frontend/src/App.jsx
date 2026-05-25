// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import Login from './components/Login/Login';
import { logout } from './services/auth.service';
// Cuando tengas la lista de plantas la importaremos aquí, ej:
// import PlantList from './components/PlantList/PlantList';

function App() {
  // 1. Estados para controlar la sesión
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Comprobar si ya había un token guardado al abrir la página
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 3. Callback para cuando el usuario ingresa sus datos correctamente
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  // 4. Callback para limpiar el token y cerrar la sesión
  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  // 5. Renderizado Condicional: Si no está autenticado, muestra la pantalla verde de Login
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // 6. Si está autenticado, muestra la aplicación principal de Erythrina
  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e0e0e0', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ color: '#2e7d32', margin: 0 }}>Erythrina</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Panel de Control de Plantas</p>
        </div>
        <button 
          onClick={handleLogout}
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
}

export default App;