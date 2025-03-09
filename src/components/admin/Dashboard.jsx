import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Work as WorkIcon, Mail as MailIcon, Logout as LogoutIcon, Code as CodeIcon } from '@mui/icons-material';
import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProjectManager from './ProjectManager';
import MessageManager from './MessageManager';
import DashboardHome from './DashboardHome';
import SkillManager from './SkillManager';

const Dashboard = ({ setIsAuthenticated }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    navigate('/admin');
  };

  const menuItems = [
    { text: 'Genel Bakış', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Projeler', icon: <WorkIcon />, path: '/admin/projects' },
    { text: 'Yetenekler', icon: <CodeIcon />, path: '/admin/skills' },
    { text: 'Mesajlar', icon: <MailIcon />, path: '/admin/messages' },
  ];

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Çıkış Yap" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
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
              borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` },
          mt: { xs: 7, sm: 8 },
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/projects" element={<ProjectManager />} />
          <Route path="/skills" element={<SkillManager />} />
          <Route path="/messages" element={<MessageManager />} />
          <Route path="*" element={<Navigate to="/admin/projects" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired
};

export default Dashboard;
