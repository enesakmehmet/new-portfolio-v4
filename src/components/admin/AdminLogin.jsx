import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, TextField, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AdminLogin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Bu örnek için basit bir doğrulama
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('userToken', 'dummy-token');
        localStorage.setItem('isAdmin', 'true');
        setIsAuthenticated(true);
        navigate('/admin/projects'); // Doğrudan projelere yönlendir
      } else {
        setError('Kullanıcı adı veya şifre hatalı');
      }
    } catch (err) {
      setError('Giriş yapılırken bir hata oluştu');
      console.error('Login error:', err);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Admin Girişi
        </Typography>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TextField
            label="Kullanıcı Adı"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            autoComplete="username"
          />
          <TextField
            label="Şifre"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            autoComplete="current-password"
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
          >
            Giriş Yap
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

AdminLogin.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
};

export default AdminLogin;
