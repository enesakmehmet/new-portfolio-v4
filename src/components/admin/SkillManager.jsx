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
  Slider,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const SkillManager = () => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('skills');
    return savedSkills ? JSON.parse(savedSkills) : [
      { id: 1, name: 'React', level: 90 },
      { id: 2, name: 'JavaScript', level: 85 },
      { id: 3, name: 'Node.js', level: 80 },
    ];
  });

  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });

  const handleSave = () => {
    let updatedSkills;
    if (editingSkill) {
      updatedSkills = skills.map(skill => 
        skill.id === editingSkill.id ? { ...skill, ...newSkill } : skill
      );
    } else {
      const id = Math.max(0, ...skills.map(s => s.id)) + 1;
      updatedSkills = [...skills, { ...newSkill, id }];
    }
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
    handleClose();
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, level: skill.level });
    setOpen(true);
  };

  const handleDelete = (id) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
    setNewSkill({ name: '', level: 50 });
  };

  const handleAdd = () => {
    setEditingSkill(null);
    setNewSkill({ name: '', level: 50 });
    setOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Yetenekler</Typography>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Yeni Yetenek Ekle
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Yetenek</TableCell>
              <TableCell>Seviye (%)</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(skill)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(skill.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingSkill ? 'Yetenek Düzenle' : 'Yeni Yetenek Ekle'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, minWidth: 400 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Yetenek Adı"
              fullWidth
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            />
            <Box sx={{ mt: 3 }}>
              <Typography gutterBottom>Seviye</Typography>
              <Slider
                value={newSkill.level}
                onChange={(e, newValue) => setNewSkill({ ...newSkill, level: newValue })}
                valueLabelDisplay="auto"
                step={5}
                marks
                min={0}
                max={100}
              />
            </Box>
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

export default SkillManager;
