import { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton, Avatar, Button, Grid, Paper, useTheme, Tooltip, Divider } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Work as WorkIcon, Mail as MailIcon, Logout as LogoutIcon, Code as CodeIcon, Palette as PaletteIcon, Add as AddIcon, Brightness4, Brightness7, Person as PersonIcon } from '@mui/icons-material';
import { useNavigate, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectManager from './ProjectManager';
import MessageManager from './MessageManager';
import DashboardHome from './DashboardHome';
import SkillManager from './SkillManager';
import ThemeManager from './ThemeManager';

const Dashboard = ({ setIsAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [profile, setProfile] = useState({ name: 'Admin', avatar: '' });
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0 });
  const [recentMessages, setRecentMessages] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  // Simüle veri fetch (gerçek API ile değiştirilebilir)
  useEffect(() => {
    setProfile({ name: 'Admin', avatar: '' });
    setStats({ projects: 8, skills: 15, messages: 4 });
    setRecentMessages([
      { id: 1, name: 'Ahmet', subject: 'İş birliği', date: '2025-04-10' },
      { id: 2, name: 'Zeynep', subject: 'Tasarım', date: '2025-04-09' }
    ]);
    setRecentProjects([
      { id: 1, title: 'Modern Portfolio', date: '2025-04-07' },
      { id: 2, title: 'Blog Platformu', date: '2025-04-01' }
    ]);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const handleThemeToggle = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
    // Burada gerçek tema değişimi context ile yapılabilir
  };

  const menuItems = [
    { text: 'Genel Bakış', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Projeler', icon: <WorkIcon />, path: '/admin/projects' },
    { text: 'Yetenekler', icon: <CodeIcon />, path: '/admin/skills' },
    { text: 'Mesajlar', icon: <MailIcon />, path: '/admin/messages' },
    { text: 'Tema Ayarları', icon: <PaletteIcon />, path: '/admin/theme' },
  ];

  const drawer = (
    <Box>
      <Toolbar /> {/* AppBar yüksekliği kadar boşluk bırakır */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2, mt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mb: 1, boxShadow: 2 }}>
          <PersonIcon fontSize="large" />
        </Avatar>
        <Typography variant="subtitle1">{profile.name}</Typography>
      </Box>
      <Divider />
      <List sx={{ position: 'relative', zIndex: 1250 }}> {/* Tıklanabilirlik için z-index yükseltildi */}
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)} 
            selected={location.pathname === item.path} 
            sx={{ 
              borderRadius: 2, 
              mx: 1, 
              mb: 0.5,
              position: 'relative',
              zIndex: 1250, // Tıklanabilirlik için z-index
              '&:hover': {
                backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem 
          button 
          onClick={handleLogout} 
          sx={{ 
            borderRadius: 2, 
            mx: 1, 
            mt: 2,
            position: 'relative',
            zIndex: 1250, // Tıklanabilirlik için z-index
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Çıkış Yap" />
        </ListItem>
      </List>
    </Box>
  );

  // Ana Dashboard içeriği
  const overviewContent = (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Hoş Geldin, {profile.name}!</Typography>
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Proje</Typography>
            <Typography variant="h3" color="primary">{stats.projects}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Toplam Yetenek</Typography>
            <Typography variant="h3" color="primary">{stats.skills}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={4} sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Gelen Mesaj</Typography>
            <Typography variant="h3" color="primary">{stats.messages}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Son Mesajlar</Typography>
            {recentMessages.map(msg => (
              <Box key={msg.id} sx={{ mb: 1 }}>
                <Typography variant="body2"><b>{msg.name}</b> - {msg.subject} <span style={{ float: 'right', color: '#888' }}>{msg.date}</span></Typography>
              </Box>
            ))}
            {recentMessages.length === 0 && <Typography variant="body2">Henüz mesaj yok.</Typography>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>Son Projeler</Typography>
            {recentProjects.map(proj => (
              <Box key={proj.id} sx={{ mb: 1 }}>
                <Typography variant="body2"><b>{proj.title}</b> <span style={{ float: 'right', color: '#888' }}>{proj.date}</span></Typography>
              </Box>
            ))}
            {recentProjects.length === 0 && <Typography variant="body2">Henüz proje yok.</Typography>}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => navigate('/admin/projects')}>Yeni Proje Ekle</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" startIcon={<AddIcon />} color="secondary" onClick={() => navigate('/admin/skills')}>Yeni Yetenek Ekle</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<PaletteIcon />} onClick={() => navigate('/admin/theme')}>Tema Değiştir</Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: themeMode === 'dark' ? '#181c23' : '#f5f7fa' }}>
      {/* AppBar - Üst Menü */}
      <AppBar position="fixed" sx={{ 
        zIndex: 1300, // Daha yüksek z-index
        background: themeMode === 'dark' ? '#23272f' : 'primary.main', 
        boxShadow: 3,
        height: 64 // Sabit yükseklik
      }} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Tooltip title={themeMode === 'dark' ? 'Açık Tema' : 'Koyu Tema'}>
            <IconButton color="inherit" onClick={handleThemeToggle}>
              {themeMode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      
      {/* Sol Menü */}
      <Box component="nav" sx={{ 
        width: { sm: 240 }, 
        flexShrink: { sm: 0 }, 
        zIndex: 1200,
        position: 'relative', // Tıklanabilirlik için position
        pointerEvents: 'auto' // Tıklanabilirlik için pointer-events
      }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240, 
              background: themeMode === 'dark' ? '#23272f' : '#fff', 
              boxShadow: 3,
              zIndex: 1200, // Drawer z-index
              position: 'relative', // Tıklanabilirlik için position
              pointerEvents: 'auto' // Tıklanabilirlik için pointer-events
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240, 
              background: themeMode === 'dark' ? '#23272f' : '#fff', 
              boxShadow: 3,
              zIndex: 1200, // Drawer z-index
              position: 'relative', // Tıklanabilirlik için position
              pointerEvents: 'auto' // Tıklanabilirlik için pointer-events
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
      {/* Ana İçerik Alanı */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 4 }, 
        mt: { xs: 10, sm: 10 }, // Daha fazla üst boşluk
        minHeight: '100vh', 
        background: themeMode === 'dark' ? '#181c23' : '#f5f7fa', 
        borderRadius: { xs: 0, sm: 4 },
        position: 'relative', // İçerik alanının pozisyonu
        zIndex: 1000 // İçerik alanı z-index
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={overviewContent} />
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/skills" element={<SkillManager />} />
          <Route path="/messages" element={<MessageManager />} />
          <Route path="/theme" element={<ThemeManager />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
};

export default Dashboard;
