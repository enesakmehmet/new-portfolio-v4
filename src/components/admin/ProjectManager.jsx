import { useState, useEffect } from 'react';
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
import axios from 'axios';

import gameImg from '../../assets/game.png';
import waterImg from '../../assets/water.png';
import petsImg from '../../assets/pets.png';
import movieImg from '../../assets/movie.png';

const initialProjects = [
  {
    id: 1,
    title: "E-Ticaret Oyun Key Satış Platformu",
    description: "Modern bir e-ticaret platformu. Kullanıcılar ürünleri görüntüleyebilir, sepete ekleyebilir ve satın alabilir. Admin paneli ile ürün yönetimi, sipariş takibi ve kullanıcı yönetimi yapılabilir.",
    technologies: ["JavaScript", "Node.js", "PostgreSQL", "Express.js"],
    image: gameImg,
    githubLink: "https://github.com/enesakmehmet/game-web-v3"
  },
  {
    id: 2,
    title: "OpenWeatherMap",
    description: "OpenWeatherMap API'sini kullanarak anlık hava durumu, hava tahmini, hava kalitesi ve UV endeksi gibi bilgileri alıyor.",
    technologies: ["React", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: waterImg,
    githubLink: "https://github.com/"
  },
  {
    id: 3,
    title: "Happy Pets",
    description: "Bu proje, Happy Pets isimli bir online pet shop platformunu içeren kapsamlı bir web sitesi geliştirmeyi amaçlamaktadır.",
    technologies: ["React", "Socket.io", "Node.js", "MongoDB"],
    image: petsImg,
    githubLink: "https://github.com/"
  },
  {
    id: 4,
    title: "Movie App",
    description: "Bu proje, Film Dünyası adında bir film keşfetme ve yönetme platformudur.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    image: movieImg,
    githubLink: "https://github.com/"
  }
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch projects from API on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // Try to fetch from API first
        const response = await axios.get(`${API_URL}/api/projects`);
        if (response.data && response.data.length > 0) {
          setProjects(response.data);
        } else {
          // Fallback to initial projects if API returns empty
          setProjects(initialProjects);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        // Fallback to initial projects if API request fails
        setProjects(initialProjects);
        setError('Projeler yüklenirken bir hata oluştu. Örnek projeler gösteriliyor.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Create a new project object with all the data
      const projectData = {
        title: newProject.title,
        description: newProject.description,
        technologies: newProject.technologies,
        liveUrl: newProject.liveUrl || '',
        githubUrl: newProject.githubUrl || '',
      };
      
      // Handle image separately to ensure proper storage
      if (selectedFile) {
        // Create a blob URL for the image that can be displayed
        const imageUrl = URL.createObjectURL(selectedFile);
        projectData.imageUrl = imageUrl;
        
        // Also store the file for potential API upload
        projectData.imageFile = selectedFile;
      } else if (editingProject?.imageUrl) {
        projectData.imageUrl = editingProject.imageUrl;
      } else if (editingProject?.image) {
        projectData.image = editingProject.image;
      }
      
      // Simulate API response with local data
      let updatedProject;
      
      if (editingProject) {
        // Update existing project
        updatedProject = {
          ...editingProject,
          ...projectData,
          _id: editingProject._id || editingProject.id
        };
        
        // Update local state with the updated project
        const updatedProjects = projects.map(project => 
          (project._id === updatedProject._id || project.id === updatedProject._id) 
            ? updatedProject 
            : project
        );
        setProjects(updatedProjects);
        
        // Save to localStorage
        saveProjectsToLocalStorage(updatedProjects);
        
        // Try to update on server if available
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append('title', newProject.title);
          formData.append('description', newProject.description);
          formData.append('technologies', JSON.stringify(newProject.technologies));
          formData.append('liveUrl', newProject.liveUrl || '');
          formData.append('githubUrl', newProject.githubUrl || '');
          
          if (selectedFile) {
            formData.append('image', selectedFile);
          }
          
          // Try to update on server but don't wait for response
          axios.put(
            `${API_URL}/api/projects/${editingProject._id || editingProject.id}`, 
            formData
          ).catch(error => console.log('Server update failed, but local update succeeded:', error.message));
        } catch {
          console.log('Server update failed, but local update succeeded');
        }
        
        setSnackbar({
          open: true,
          message: 'Proje başarıyla güncellendi',
          severity: 'success'
        });
      } else {
        // Create new project
        const newId = Math.max(...projects.map(p => p._id || p.id || 0)) + 1;
        updatedProject = {
          ...projectData,
          _id: newId,
          id: newId,
          createdAt: new Date().toISOString()
        };
        
        // Add new project to local state
        const updatedProjects = [...projects, updatedProject];
        setProjects(updatedProjects);
        
        // Save to localStorage
        saveProjectsToLocalStorage(updatedProjects);
        
        // Try to create on server if available
        try {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append('title', newProject.title);
          formData.append('description', newProject.description);
          formData.append('technologies', JSON.stringify(newProject.technologies));
          formData.append('liveUrl', newProject.liveUrl || '');
          formData.append('githubUrl', newProject.githubUrl || '');
          
          if (selectedFile) {
            formData.append('image', selectedFile);
          }
          
          // Try to create on server but don't wait for response
          axios.post(`${API_URL}/api/projects`, formData)
            .catch(error => console.log('Server create failed, but local create succeeded:', error.message));
        } catch {
          console.log('Server create failed, but local create succeeded');
        }
        
        setSnackbar({
          open: true,
          message: 'Yeni proje başarıyla oluşturuldu',
          severity: 'success'
        });
      }
      
      handleClose();
    } catch (err) {
      console.error('Error saving project:', err);
      setSnackbar({
        open: true,
        message: 'Proje kaydedilirken bir hata oluştu',
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
      githubUrl: project.githubUrl || project.githubLink || '',
    });
    
    // Handle image preview from different sources
    if (project.imageUrl) {
      setImagePreview(project.imageUrl.startsWith('http') 
        ? project.imageUrl 
        : `${API_URL}${project.imageUrl}`);
    } else if (project.image) {
      setImagePreview(project.image);
    } else {
      setImagePreview('');
    }
    
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
      return;
    }
    
    setLoading(true);
    try {
      // Remove project from local state
      const updatedProjects = projects.filter(project => 
        project._id !== id && project.id !== id
      );
      setProjects(updatedProjects);
      
      // Save to localStorage
      saveProjectsToLocalStorage(updatedProjects);
      
      // Try to delete on server if available
      try {
        axios.delete(`${API_URL}/api/projects/${id}`)
          .catch(error => console.log('Server delete failed, but local delete succeeded:', error.message));
      } catch {
        console.log('Server delete failed, but local delete succeeded');
      }
      
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
      // Store the selected file
      setSelectedFile(file);
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
      };
      fileReader.readAsDataURL(file);
      
      // Update the form data
      setNewProject({
        ...newProject,
        // We don't set imageUrl here as it will be handled during save
      });
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

  const saveProjectsToLocalStorage = (updatedProjects) => {
    try {
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
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
                <TableRow key={project._id || project.id}>
                  <TableCell>
                    {(project.imageUrl || project.image) ? (
                      <Box
                        component="img"
                        src={project.imageUrl ? 
                          (project.imageUrl.startsWith('http') 
                            ? project.imageUrl 
                            : `${API_URL}${project.imageUrl}`)
                          : project.image}
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
                      {(project.technologies || [])?.slice(0, 3).map((tech, index) => (
                        <Chip
                          key={index}
                          label={tech}
                          size="small"
                        />
                      ))}
                      {(project.technologies || [])?.length > 3 && (
                        <Chip label={`+${project.technologies.length - 3}`} size="small" variant="outlined" />
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {(project.liveUrl) && (
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
                      {(project.githubUrl || project.githubLink) && (
                        <Button
                          size="small"
                          variant="outlined"
                          href={project.githubUrl || project.githubLink}
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
                    <IconButton onClick={() => handleDelete(project._id || project.id)} color="error">
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
