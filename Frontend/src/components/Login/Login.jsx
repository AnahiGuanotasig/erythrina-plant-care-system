// frontend/src/components/Login.jsx
import { useState } from "react";
import { login } from "../../services/auth.service";
import "./Login.scss";

const Login = ({ onLoginSuccess }) => {
    const [correo_electronico, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await login(correo_electronico, password);

            if (response.success) {
                onLoginSuccess(response.data);
            }
        } catch (err) {
            const errorMsg =
                err.response?.data?.message || "Error al conectar con el servidor";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Erythrina</h2>
                <p className="subtitle">Sistema de Gestión de Plantas</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={correo_electronico}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? "Iniciando sesión..." : "Ingresar"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
