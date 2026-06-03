import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Container, InputAdornment, IconButton } from '@mui/material';
import { LuUser, LuLock, LuEye, LuEyeOff, LuLogIn } from 'react-icons/lu';
import { login } from '../../services/auth.service';
import { getUserCredentialByEmail } from '../../services/user.service';

const Login = ({ onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const form = e.target;
        const credentials = {
            correo_electronico: form.correo_electronico.value,
            password: form.password.value
        };

        try {
            const respuesta = await login(credentials.correo_electronico, credentials.password);
            if (respuesta.success){
                const dataUser = await getUserCredentialByEmail(credentials.correo_electronico);
                if (dataUser && dataUser.id) {
                    onLoginSuccess(dataUser.id); 
                } else {
                    setError('Credenciales incorrectas');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ 
            backgroundColor: '#f4f6f8', 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
        }}>
            <Container maxWidth="xs">
                <Paper elevation={4} sx={{ p: 4, borderRadius: '16px', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 1 }}>
                        Erythrina
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
                        Ingresa tus credenciales para gestionar tus plantas
                    </Typography>

                    {error && (
                        <Typography variant="body2" sx={{ color: '#d32f2f', mb: 2, fontWeight: '500' }}>
                            ⚠️ {error}
                        </Typography>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            name="correo_electronico"
                            label="Correo Electrónico"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LuUser size={20} color="#757575" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            name="password"
                            label="Contraseña"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LuLock size={20} color="#757575" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            disabled={loading}
                            startIcon={<LuLogIn />}
                            sx={{ 
                                py: 1.5, 
                                borderRadius: '8px', 
                                fontWeight: 'bold', 
                                backgroundColor: '#2e7d32',
                                '&:hover': { backgroundColor: '#1b5e20' }
                            }}
                        >
                            {loading ? 'Verificando...' : 'Iniciar Sesión'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;