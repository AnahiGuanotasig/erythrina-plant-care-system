// frontend/src/App.jsx
import { useState } from 'react';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 
import { logout } from './services/auth.service';

function App() {
  const [user, setUser] = useState(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? Number(storedUserId) : null;
  });
  const [view, setView] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });


  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('userId', userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    if (view === 'register') {
      return <Register onShowLogin={() => setView('login')} />;
    }
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onShowRegister={() => setView('register')}
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;