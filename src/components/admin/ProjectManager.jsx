import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const ProjectManager = () => {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      {
        id: 1,
        title: 'E-ticaret Sitesi',
        description: 'Modern bir e-ticaret platformu',
        status: 'Devam Ediyor',
        date: '2025-03-01',
      },
      {
        id: 2,
        title: 'Blog Platformu',
        description: 'Kişisel blog yönetim sistemi',
        status: 'Tamamlandı',
        date: '2025-02-15',
      },
      {
        id: 3,
        title: 'Mobil Uygulama',
        description: 'iOS ve Android için fitness uygulaması',
        status: 'Planlama',
        date: '2025-04-01',
      },
    ];
  });

  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    status: 'Planlama',
    date: new Date().toISOString().split('T')[0],
  });

  const statusOptions = ['Planlama', 'Devam Ediyor', 'Tamamlandı'];

  const handleSave = () => {
    if (editingProject) {
      setProjects(projects.map(project =>
        project.id === editingProject.id ? { ...project, ...newProject } : project
      ));
    } else {
      const id = Math.max(0, ...projects.map(p => p.id)) + 1;
      setProjects([...projects, { ...newProject, id }]);
    }
    localStorage.setItem('projects', JSON.stringify(projects));
    handleClose();
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      status: project.status,
      date: project.date,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      status: 'Planlama',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleAdd = () => {
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      status: 'Planlama',
      date: new Date().toISOString().split('T')[0],
    });
    setOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Projeler</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Yeni Proje Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Proje Adı</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Tarih</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.date}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(project)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(project.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, minWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Proje Adı"
              fullWidth
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Açıklama"
              fullWidth
              multiline
              rows={3}
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            />
            <TextField
              select
              margin="dense"
              label="Durum"
              fullWidth
              value={newProject.status}
              onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="dense"
              label="Tarih"
              type="date"
              fullWidth
              value={newProject.date}
              onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectManager;
