import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Brightness4 as DarkIcon, Brightness7 as LightIcon, Save as SaveIcon, Refresh as ResetIcon } from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

const ThemeManager = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [customColors, setCustomColors] = useState({
    accentPrimary: '',
    accentSecondary: '',
  });
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    // Load any custom colors from localStorage
    const savedColors = localStorage.getItem('customColors');
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors));
    }
  }, []);

  const handleColorChange = (colorKey, value) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
  };

  const applyCustomColors = () => {
    // Save custom colors to localStorage
    localStorage.setItem('customColors', JSON.stringify(customColors));
    
    // Apply custom colors to CSS variables
    if (customColors.accentPrimary) {
      document.documentElement.style.setProperty('--accent-primary', customColors.accentPrimary);
    }
    if (customColors.accentSecondary) {
      document.documentElement.style.setProperty('--accent-secondary', customColors.accentSecondary);
    }
  };

  const resetCustomColors = () => {
    // Reset to default colors
    setCustomColors({
      accentPrimary: '',
      accentSecondary: '',
    });
    localStorage.removeItem('customColors');
    document.documentElement.style.removeProperty('--accent-primary');
    document.documentElement.style.removeProperty('--accent-secondary');
  };

  const togglePreview = () => {
    if (!previewMode) {
      // Apply colors temporarily for preview
      if (customColors.accentPrimary) {
        document.documentElement.style.setProperty('--accent-primary', customColors.accentPrimary);
      }
      if (customColors.accentSecondary) {
        document.documentElement.style.setProperty('--accent-secondary', customColors.accentSecondary);
      }
    } else {
      // Revert to saved colors
      const savedColors = localStorage.getItem('customColors');
      if (savedColors) {
        const colors = JSON.parse(savedColors);
        if (colors.accentPrimary) {
          document.documentElement.style.setProperty('--accent-primary', colors.accentPrimary);
        } else {
          document.documentElement.style.removeProperty('--accent-primary');
        }
        if (colors.accentSecondary) {
          document.documentElement.style.setProperty('--accent-secondary', colors.accentSecondary);
        } else {
          document.documentElement.style.removeProperty('--accent-secondary');
        }
      } else {
        document.documentElement.style.removeProperty('--accent-primary');
        document.documentElement.style.removeProperty('--accent-secondary');
      }
    }
    setPreviewMode(!previewMode);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tema Yönetimi
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          {/* Theme Toggle Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tema Modu
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={darkMode}
                        onChange={toggleTheme}
                        color="primary"
                      />
                    }
                    label={darkMode ? "Karanlık Mod" : "Aydınlık Mod"}
                  />
                  <IconButton color="primary">
                    {darkMode ? <DarkIcon /> : <LightIcon />}
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="textSecondary">
                  Tema tercihiniz otomatik olarak kaydedilir ve tüm oturumlarınızda korunur.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Custom Colors Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Özel Renkler
                </Typography>
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Ana Vurgu Rengi"
                    placeholder="#3498db"
                    value={customColors.accentPrimary}
                    onChange={(e) => handleColorChange('accentPrimary', e.target.value)}
                    margin="normal"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: customColors.accentPrimary || '#3498db',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                          }}
                        />
                      ),
                    }}
                  />
                  
                  <TextField
                    fullWidth
                    label="İkincil Vurgu Rengi"
                    placeholder="#2980b9"
                    value={customColors.accentSecondary}
                    onChange={(e) => handleColorChange('accentSecondary', e.target.value)}
                    margin="normal"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            bgcolor: customColors.accentSecondary || '#2980b9',
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                          }}
                        />
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ResetIcon />}
                    onClick={resetCustomColors}
                  >
                    Sıfırla
                  </Button>
                  
                  <Box>
                    <Tooltip title={previewMode ? "Önizlemeyi Kapat" : "Önizle"}>
                      <Button
                        variant="outlined"
                        onClick={togglePreview}
                        sx={{ mr: 1 }}
                      >
                        {previewMode ? "Önizlemeyi Kapat" : "Önizle"}
                      </Button>
                    </Tooltip>
                    
                    <Button
                      variant="contained"
                      startIcon={<SaveIcon />}
                      onClick={applyCustomColors}
                      disabled={!customColors.accentPrimary && !customColors.accentSecondary}
                    >
                      Kaydet
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Theme Preview Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tema Önizleme
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary" gutterBottom>
                  Başlık Örneği
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Bu bir metin örneğidir. Tema değişikliklerini burada görebilirsiniz.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" sx={{ mr: 1 }}>
                    Ana Buton
                  </Button>
                  <Button variant="outlined">
                    İkincil Buton
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Form Elemanları
                </Typography>
                <TextField
                  fullWidth
                  label="Örnek Input"
                  placeholder="Bir şeyler yazın..."
                  margin="normal"
                  size="small"
                />
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Örnek Switch"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ThemeManager;
