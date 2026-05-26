import { useState } from "react";
import "../Login/Login.scss";
import { createUser } from "../../services/user.service";

const Register = ({ onShowLogin }) => {
    const [nombre, setNombre] = useState("");
    const [correo_electronico, setCorreoElectronico] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setLoading(true);

        try {
            await createUser(nombre, correo_electronico, password);
            
            setSuccess("Registro completado. Ahora puedes iniciar sesión.");
            setNombre("");
            setCorreoElectronico("");
            setPassword("");
            setConfirmPassword("");
        } catch (err) { 
            console.error(err);
            const errorMsg = err.response?.data?.message || "Error al registrar el usuario. Intenta nuevamente.";
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-split-container">
            <div className="login-form-side">
                <div className="login-card">
                    <h2>Crear Cuenta</h2>
                    <p className="subtitle">Completa el formulario para registrarte</p>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre de usuario</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                placeholder="Tu nombre"
                            />
                        </div>

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

                        <div className="form-group">
                            <label>Confirmar contraseña</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        <button type="submit" className="btn-login" disabled={loading}>
                            {loading ? "Cargando..." : "Registrarse"}
                        </button>

                        <div className="form-footer">
                            <span>¿Ya tienes cuenta? </span>
                            <button
                                type="button"
                                className="link-button"
                                onClick={onShowLogin}
                            >
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="login-image-side">
                <div className="image-overlay-text">
                    <h1>Erythrina</h1>
                    <p>Sistema de Gestión y Cuidado de Plantas</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
