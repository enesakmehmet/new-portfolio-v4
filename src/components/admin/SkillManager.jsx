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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaGitAlt, FaNodeJs, FaSass, FaGithub } from 'react-icons/fa';
import { SiTypescript, SiAdobexd, SiFigma, SiPostman, SiReacthookform, SiExpress, SiPassport, SiPostgresql, SiPrisma, SiNestjs } from 'react-icons/si';
import { MdDevices, MdStorage } from 'react-icons/md';
import { BsBrushFill } from 'react-icons/bs';
import { TbBrandReactNative } from 'react-icons/tb';

const SkillManager = () => {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('skillCategories');
    return savedSkills ? JSON.parse(savedSkills) : [
      {
        category: "Frontend",
        icon: "FaReact",
        description: "Modern web teknolojileri ile kullanıcı deneyimi odaklı geliştirme",
        items: [
          { name: "HTML5", level: 90, icon: "FaHtml5" },
          { name: "CSS3", level: 85, icon: "FaCss3Alt" },
          { name: "JavaScript", level: 85, icon: "FaJs" },
          { name: "React", level: 80, icon: "FaReact" },
          { name: "React Native", level: 75, icon: "TbBrandReactNative" },
          { name: "Vue.js", level: 75, icon: "FaVuejs" },
          { name: "Sass", level: 80, icon: "FaSass" },
          { name: "Figma", level: 85, icon: "SiFigma" },
          { name: "GitHub", level: 85, icon: "FaGithub" },
          { name: "Postman", level: 75, icon: "SiPostman" },
          { name: "Zustand", level: 75, icon: "MdStorage" },
          { name: "React Hook Form", level: 80, icon: "SiReacthookform" }
        ]
      },
      {
        category: "UI/UX Tasarım",
        icon: "BsBrushFill",
        description: "Kullanıcı odaklı arayüz tasarımı ve deneyim optimizasyonu",
        items: [
          { name: "Figma", level: 85, icon: "SiFigma" },
          { name: "Adobe XD", level: 80, icon: "SiAdobexd" },
          { name: "Responsive Tasarım", level: 90, icon: "MdDevices" },
          { name: "UI Prensipleri", level: 85, icon: "BsBrushFill" }
        ]
      },
      {
        category: "Backend",
        icon: "FaNodeJs",
        description: "Sunucu tarafı teknolojileri ve veritabanı yönetimi",
        items: [
          { name: "Node.js", level: 80, icon: "FaNodeJs" },
          { name: "TypeScript", level: 75, icon: "SiTypescript" },
          { name: "Express.js", level: 75, icon: "SiExpress" },
          { name: "Passport.js", level: 70, icon: "SiPassport" },
          { name: "PostgreSQL", level: 75, icon: "SiPostgresql" },
          { name: "Prisma ORM", level: 70, icon: "SiPrisma" },
          { name: "NestJS", level: 70, icon: "SiNestjs" }
        ]
      }
    ];
  });

  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, icon: 'FaReact' });
  const [newCategory, setNewCategory] = useState({ category: '', icon: 'FaReact', description: '' });
  const [dialogMode, setDialogMode] = useState('skill'); // 'skill' or 'category'

  // Available icons for selection
  const iconOptions = [
    { value: 'FaHtml5', label: 'HTML5', component: <FaHtml5 /> },
    { value: 'FaCss3Alt', label: 'CSS3', component: <FaCss3Alt /> },
    { value: 'FaJs', label: 'JavaScript', component: <FaJs /> },
    { value: 'FaReact', label: 'React', component: <FaReact /> },
    { value: 'FaVuejs', label: 'Vue.js', component: <FaVuejs /> },
    { value: 'FaNodeJs', label: 'Node.js', component: <FaNodeJs /> },
    { value: 'FaSass', label: 'Sass', component: <FaSass /> },
    { value: 'FaGithub', label: 'GitHub', component: <FaGithub /> },
    { value: 'FaGitAlt', label: 'Git', component: <FaGitAlt /> },
    { value: 'SiTypescript', label: 'TypeScript', component: <SiTypescript /> },
    { value: 'SiAdobexd', label: 'Adobe XD', component: <SiAdobexd /> },
    { value: 'SiFigma', label: 'Figma', component: <SiFigma /> },
    { value: 'SiPostman', label: 'Postman', component: <SiPostman /> },
    { value: 'SiReacthookform', label: 'React Hook Form', component: <SiReacthookform /> },
    { value: 'SiExpress', label: 'Express.js', component: <SiExpress /> },
    { value: 'SiPassport', label: 'Passport.js', component: <SiPassport /> },
    { value: 'SiPostgresql', label: 'PostgreSQL', component: <SiPostgresql /> },
    { value: 'SiPrisma', label: 'Prisma', component: <SiPrisma /> },
    { value: 'SiNestjs', label: 'NestJS', component: <SiNestjs /> },
    { value: 'MdDevices', label: 'Devices', component: <MdDevices /> },
    { value: 'MdStorage', label: 'Storage', component: <MdStorage /> },
    { value: 'BsBrushFill', label: 'Brush', component: <BsBrushFill /> },
    { value: 'TbBrandReactNative', label: 'React Native', component: <TbBrandReactNative /> },
  ];

  // Get icon component by name
  const getIconComponent = (iconName) => {
    const icon = iconOptions.find(icon => icon.value === iconName);
    return icon ? icon.component : <FaReact />;
  };

  const handleSaveSkill = () => {
    const currentCategory = skills[activeTab];
    let updatedSkills = [...skills];
    
    if (editingSkill) {
      // Edit existing skill
      updatedSkills[activeTab] = {
        ...currentCategory,
        items: currentCategory.items.map(skill => 
          skill.name === editingSkill.name ? { ...newSkill } : skill
        )
      };
    } else {
      // Add new skill
      updatedSkills[activeTab] = {
        ...currentCategory,
        items: [...currentCategory.items, { ...newSkill }]
      };
    }
    
    setSkills(updatedSkills);
    localStorage.setItem('skillCategories', JSON.stringify(updatedSkills));
    handleClose();
  };

  const handleSaveCategory = () => {
    let updatedSkills = [...skills];
    
    if (editingCategory) {
      // Edit existing category
      updatedSkills = updatedSkills.map(category => 
        category.category === editingCategory.category ? 
          { ...category, category: newCategory.category, icon: newCategory.icon, description: newCategory.description } : 
          category
      );
    } else {
      // Add new category
      updatedSkills = [...updatedSkills, { ...newCategory, items: [] }];
    }
    
    setSkills(updatedSkills);
    localStorage.setItem('skillCategories', JSON.stringify(updatedSkills));
    handleClose();
  };

  const handleEditSkill = (skill) => {
    setDialogMode('skill');
    setEditingSkill(skill);
    setNewSkill({ ...skill });
    setOpen(true);
  };

  const handleEditCategory = (category) => {
    setDialogMode('category');
    setEditingCategory(category);
    setNewCategory({ 
      category: category.category, 
      icon: category.icon, 
      description: category.description 
    });
    setOpen(true);
  };

  const handleDeleteSkill = (skillName) => {
    const currentCategory = skills[activeTab];
    const updatedSkills = [...skills];
    updatedSkills[activeTab] = {
      ...currentCategory,
      items: currentCategory.items.filter(skill => skill.name !== skillName)
    };
    
    setSkills(updatedSkills);
    localStorage.setItem('skillCategories', JSON.stringify(updatedSkills));
  };

  const handleDeleteCategory = (categoryIndex) => {
    const updatedSkills = skills.filter((_, index) => index !== categoryIndex);
    setSkills(updatedSkills);
    localStorage.setItem('skillCategories', JSON.stringify(updatedSkills));
    
    // Update active tab if needed
    if (activeTab >= updatedSkills.length) {
      setActiveTab(Math.max(0, updatedSkills.length - 1));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
    setEditingCategory(null);
    setNewSkill({ name: '', level: 50, icon: 'FaReact' });
    setNewCategory({ category: '', icon: 'FaReact', description: '' });
  };

  const handleAddSkill = () => {
    setDialogMode('skill');
    setEditingSkill(null);
    setNewSkill({ name: '', level: 50, icon: 'FaReact' });
    setOpen(true);
  };

  const handleAddCategory = () => {
    setDialogMode('category');
    setEditingCategory(null);
    setNewCategory({ category: '', icon: 'FaReact', description: '' });
    setOpen(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Yetenekler Yönetimi</Typography>
        <Box>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddSkill} 
            sx={{ mr: 1 }}
            startIcon={<AddIcon />}
          >
            Yeni Yetenek Ekle
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={handleAddCategory}
            startIcon={<AddIcon />}
          >
            Yeni Kategori Ekle
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)} 
          variant="scrollable"
          scrollButtons="auto"
        >
          {skills.map((category, index) => (
            <Tab 
              key={index} 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                    {getIconComponent(category.icon)}
                  </Box>
                  {category.category}
                </Box>
              } 
            />
          ))}
        </Tabs>
      </Box>

      {skills.length > 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">{skills[activeTab].category}</Typography>
            <Box>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => handleEditCategory(skills[activeTab])}
                sx={{ mr: 1 }}
              >
                Kategoriyi Düzenle
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleDeleteCategory(activeTab)}
              >
                Kategoriyi Sil
              </Button>
            </Box>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 3 }}>
            {skills[activeTab].description}
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>İkon</TableCell>
                  <TableCell>Yetenek</TableCell>
                  <TableCell>Seviye (%)</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {skills[activeTab].items.map((skill) => (
                  <TableRow key={skill.name}>
                    <TableCell>
                      <Box sx={{ fontSize: '1.5rem' }}>
                        {getIconComponent(skill.icon)}
                      </Box>
                    </TableCell>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.level}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEditSkill(skill)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteSkill(skill.name)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Dialog for adding/editing skills and categories */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'skill' 
            ? (editingSkill ? 'Yetenek Düzenle' : 'Yeni Yetenek Ekle')
            : (editingCategory ? 'Kategori Düzenle' : 'Yeni Kategori Ekle')
          }
        </DialogTitle>
        <DialogContent>
          {dialogMode === 'skill' ? (
            // Skill form
            <Box sx={{ pt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Yetenek Adı"
                fullWidth
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>İkon</InputLabel>
                <Select
                  value={newSkill.icon}
                  onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        {getIconComponent(selected)}
                      </Box>
                      {iconOptions.find(icon => icon.value === selected)?.label || selected}
                    </Box>
                  )}
                >
                  {iconOptions.map((icon) => (
                    <MenuItem key={icon.value} value={icon.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                          {icon.component}
                        </Box>
                        {icon.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
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
          ) : (
            // Category form
            <Box sx={{ pt: 2 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Kategori Adı"
                fullWidth
                value={newCategory.category}
                onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                sx={{ mb: 2 }}
              />
              
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Kategori İkonu</InputLabel>
                <Select
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        {getIconComponent(selected)}
                      </Box>
                      {iconOptions.find(icon => icon.value === selected)?.label || selected}
                    </Box>
                  )}
                >
                  {iconOptions.map((icon) => (
                    <MenuItem key={icon.value} value={icon.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                          {icon.component}
                        </Box>
                        {icon.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              <TextField
                margin="dense"
                label="Kategori Açıklaması"
                fullWidth
                multiline
                rows={3}
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>İptal</Button>
          <Button 
            onClick={dialogMode === 'skill' ? handleSaveSkill : handleSaveCategory} 
            variant="contained" 
            color="primary"
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SkillManager;
