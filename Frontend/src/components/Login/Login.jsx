// frontend/src/components/Login/Login.jsx
import { useState } from 'react';
import { login } from '../../services/auth.service';
import './Login.scss';

const Login = ({ onLoginSuccess, onShowRegister }) => {
    const [correo_electronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(correo_electronico, password);
            if (response.success) {
                onLoginSuccess(response.data);
            } else {
                setError(response.message || 'Credenciales incorrectas');
            }
        } catch {
            setError('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split-container">
            {/* MITAD IZQUIERDA: CONTENEDOR DEL FORMULARIO */}
            <div className="login-form-side">
                <div className="login-card">
                    <h2>¡Bienvenido!</h2>
                    <p className="subtitle">Ingresa tus credenciales para acceder</p>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                value={correo_electronico}
                                onChange={(e) => setCorreoElectronico(e.target.value)}
                                required
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? 'Cargando...' : 'Iniciar Sesión'}
                        </button>
                        <div className="form-footer">
                            <span>¿No tienes cuenta? </span>
                            <button type="button" className="link-button" onClick={onShowRegister}>
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* MITAD DERECHA: CONTENEDOR DE LA IMAGEN */}
            <div className="login-image-side">
                <div className="image-overlay-text">
                    <h1>Erythrina</h1>
                    <p>Sistema de Gestión y Cuidado de Plantas</p>
                </div>
            </div>
        </div>
    );
};

export default Login;