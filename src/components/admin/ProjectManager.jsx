import { useState, useEffect } from 'react';
import axios from 'axios';
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
  Grid,
  Chip,
  Stack,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Image as ImageIcon } from '@mui/icons-material';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
  });
  
  const [techInput, setTechInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects. Please try again.');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // Add text fields to formData
      formData.append('title', newProject.title);
      formData.append('description', newProject.description);
      formData.append('technologies', JSON.stringify(newProject.technologies));
      formData.append('liveUrl', newProject.liveUrl || '');
      formData.append('githubUrl', newProject.githubUrl || '');
      
      // Add image file if selected
      if (selectedFile) {
        formData.append('image', selectedFile);
      }
      
      if (editingProject) {
        // Update existing project
        await axios.put(
          `${API_URL}/api/projects/${editingProject._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          }
        );
        setSnackbar({
          open: true,
          message: 'Proje başarıyla güncellendi',
          severity: 'success'
        });
      } else {
        // Create new project
        await axios.post(
          `${API_URL}/api/projects`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`
            }
          }
        );
        setSnackbar({
          open: true,
          message: 'Yeni proje başarıyla oluşturuldu',
          severity: 'success'
        });
      }
      
      // Refresh projects list
      fetchProjects();
      handleClose();
    } catch (err) {
      console.error('Error saving project:', err);
      setSnackbar({
        open: true,
        message: err.response?.data?.message || 'Proje kaydedilirken bir hata oluştu',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setNewProject({
      title: project.title,
      description: project.description,
      technologies: project.technologies || [],
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
    });
    setImagePreview(project.imageUrl);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh projects list
      fetchProjects();
      setSnackbar({
        open: true,
        message: 'Proje başarıyla silindi',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting project:', err);
      setSnackbar({
        open: true,
        message: 'Proje silinirken bir hata oluştu',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    });
    setTechInput('');
    setSelectedFile(null);
    setImagePreview('');
  };

  const handleAdd = () => {
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    });
    setTechInput('');
    setSelectedFile(null);
    setImagePreview('');
    setOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !newProject.technologies.includes(techInput.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(t => t !== tech)
    });
  };

  const handleTechKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && !open) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Projeler</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleAdd}
          startIcon={<AddIcon />}
        >
          Yeni Proje Ekle
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Görsel</TableCell>
              <TableCell>Proje Adı</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>Teknolojiler</TableCell>
              <TableCell>Bağlantılar</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Henüz proje bulunmuyor
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    {project.imageUrl ? (
                      <Box
                        component="img"
                        src={project.imageUrl.startsWith('http') ? project.imageUrl : `${API_URL}${project.imageUrl}`}
                        alt={project.title}
                        sx={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 1 }}
                      />
                    ) : (
                      <ImageIcon color="disabled" />
                    )}
                  </TableCell>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>
                    {project.description.length > 50
                      ? `${project.description.substring(0, 50)}...`
                      : project.description}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {project.technologies?.slice(0, 3).map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                        />
                      ))}
                      {project.technologies?.length > 3 && (
                        <Chip label={`+${project.technologies.length - 3}`} size="small" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {project.liveUrl && (
                        <Button
                          size="small"
                          variant="outlined"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="small"
                          variant="outlined"
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Button>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(project)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(project._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                label="Proje Adı"
                fullWidth
                required
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Açıklama"
                fullWidth
                required
                multiline
                rows={4}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              />
              
              <Box sx={{ mt: 2, mb: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Teknolojiler
                </Typography>
                <Box sx={{ display: 'flex', mb: 1 }}>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Teknoloji ekle"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                  />
                  <Button 
                    variant="contained" 
                    sx={{ ml: 1 }} 
                    onClick={addTechnology}
                  >
                    Ekle
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {newProject.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      onDelete={() => removeTechnology(tech)}
                    />
                  ))}
                </Box>
              </Box>
              
              <TextField
                margin="dense"
                label="Canlı Demo URL"
                fullWidth
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                placeholder="https://example.com"
              />
              <TextField
                margin="dense"
                label="GitHub URL"
                fullWidth
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ border: '1px dashed grey', borderRadius: 1, p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {imagePreview ? (
                  <>
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Project preview"
                      sx={{ maxWidth: '100%', maxHeight: 300, objectFit: 'contain', mb: 2 }}
                    />
                    <Button
                      variant="outlined"
                      component="label"
                    >
                      Görseli Değiştir
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </>
                ) : (
                  <>
                    <ImageIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Proje görseli yükleyin
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                    >
                      Görsel Seç
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            color="primary"
            disabled={!newProject.title || !newProject.description || ((!imagePreview || !selectedFile) && !editingProject)}
          >
            {loading ? <CircularProgress size={24} /> : 'Kaydet'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProjectManager;
