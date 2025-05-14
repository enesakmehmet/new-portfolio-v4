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
  Tabs,
  Tab,
  Snackbar,
  Alert,
  Slider,
  InputAdornment
} from '@mui/material';
import { 
  Brightness4 as DarkIcon, 
  Brightness7 as LightIcon, 
  Save as SaveIcon, 
  Refresh as ResetIcon, 
  Palette as PaletteIcon,
  FormatColorFill as ColorFillIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useTheme } from '../../hooks/useTheme';

const ThemeManager = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [customColors, setCustomColors] = useState({
    primaryColor: '',
    accentPrimary: '',
    accentSecondary: '',
    textPrimary: '',
    bgPrimary: '',
    bgSecondary: ''
  });
  const [previewMode, setPreviewMode] = useState(false);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorKey, setCurrentColorKey] = useState('');

  useEffect(() => {
    // Load any custom colors from localStorage
    const savedColors = localStorage.getItem('customColors');
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors));
    } else {
      // Mevcut CSS değişkenlerini al
      const computedStyle = getComputedStyle(document.documentElement);
      setCustomColors({
        primaryColor: computedStyle.getPropertyValue('--primary-color').trim() || '',
        accentPrimary: computedStyle.getPropertyValue('--accent-primary').trim() || '',
        accentSecondary: computedStyle.getPropertyValue('--accent-secondary').trim() || '',
        textPrimary: computedStyle.getPropertyValue('--text-primary').trim() || '',
        bgPrimary: computedStyle.getPropertyValue('--bg-primary').trim() || '',
        bgSecondary: computedStyle.getPropertyValue('--bg-secondary').trim() || ''
      });
    }
  }, []);
  
  // Tema değiştiğinde renkleri güncelle
  useEffect(() => {
    if (previewMode) {
      applyColorsToDOM(customColors);
    }
  }, [darkMode]);

  const handleColorChange = (colorKey, value) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
    
    // Eğer önizleme modundaysak, renkleri gerçek zamanlı olarak uygula
    if (previewMode) {
      document.documentElement.style.setProperty(`--${colorKey.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    }
  };
  
  const applyColorsToDOM = (colors) => {
    // CSS değişkenlerini güncelle
    Object.entries(colors).forEach(([key, value]) => {
      if (value) {
        // camelCase'i kebab-case'e çevir (primaryColor -> primary-color)
        const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        document.documentElement.style.setProperty(cssVarName, value);
      }
    });
  };

  const applyCustomColors = () => {
    // Save custom colors to localStorage
    localStorage.setItem('customColors', JSON.stringify(customColors));
    
    // Apply custom colors to CSS variables
    applyColorsToDOM(customColors);
    
    setSnackbar({
      open: true,
      message: 'Tema renkleri başarıyla kaydedildi',
      severity: 'success'
    });
    
    setPreviewMode(true); // Önizleme modunu aç
  };

  const resetCustomColors = () => {
    // Reset to default colors
    const defaultColors = {
      primaryColor: '',
      accentPrimary: '',
      accentSecondary: '',
      textPrimary: '',
      bgPrimary: '',
      bgSecondary: ''
    };
    
    setCustomColors(defaultColors);
    localStorage.removeItem('customColors');
    
    // Tüm özel CSS değişkenlerini kaldır
    Object.keys(defaultColors).forEach(key => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      document.documentElement.style.removeProperty(cssVarName);
    });
    
    setSnackbar({
      open: true,
      message: 'Tema renkleri varsayılana sıfırlandı',
      severity: 'info'
    });
    
    setPreviewMode(false);
  };

  const togglePreview = () => {
    if (!previewMode) {
      // Önizleme için renkleri geçici olarak uygula
      applyColorsToDOM(customColors);
    } else {
      // Kaydedilmiş renklere geri dön
      const savedColors = localStorage.getItem('customColors');
      if (savedColors) {
        const colors = JSON.parse(savedColors);
        applyColorsToDOM(colors);
      } else {
        // Tüm özel CSS değişkenlerini kaldır
        Object.keys(customColors).forEach(key => {
          const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
          document.documentElement.style.removeProperty(cssVarName);
        });
      }
    }
    setPreviewMode(!previewMode);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Renk seçenekleri için etiketler
  const colorOptions = [
    { key: 'primaryColor', label: 'Ana Renk', description: 'Sitenin ana vurgu rengi', defaultValue: '#3498db' },
    { key: 'accentPrimary', label: 'Birincil Vurgu Rengi', description: 'Butonlar ve önemli elementler için', defaultValue: '#2980b9' },
    { key: 'accentSecondary', label: 'İkincil Vurgu Rengi', description: 'Vurgular ve detaylar için', defaultValue: '#5dade2' },
    { key: 'textPrimary', label: 'Ana Metin Rengi', description: 'Genel metin rengi', defaultValue: darkMode ? '#f5f5f5' : '#333333' },
    { key: 'bgPrimary', label: 'Ana Arkaplan Rengi', description: 'Sayfa arkaplanı', defaultValue: darkMode ? '#121212' : '#ffffff' },
    { key: 'bgSecondary', label: 'İkincil Arkaplan Rengi', description: 'Kartlar ve paneller için', defaultValue: darkMode ? '#1e1e1e' : '#f5f5f5' }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tema Yönetimi
      </Typography>
      
      <Paper sx={{ p: 3, mb: 4 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth" 
          sx={{ mb: 3 }}
          TabIndicatorProps={{ sx: { height: 3 } }}
        >
          <Tab icon={<LightIcon />} label="Tema Modu" />
          <Tab icon={<PaletteIcon />} label="Renkler" />
          <Tab icon={<ColorFillIcon />} label="Önizleme" />
        </Tabs>
        
        {/* Tema Modu Sekmesi */}
        {activeTab === 0 && (
          <Box>
            <Card sx={{ p: 2, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tema Modu Seçimi
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
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
                  <IconButton color="primary" size="large">
                    {darkMode ? <DarkIcon /> : <LightIcon />}
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="textSecondary">
                  Tema tercihiniz otomatik olarak kaydedilir ve tüm oturumlarınızda korunur.
                </Typography>
              </CardContent>
            </Card>
            
            <Typography variant="body1" sx={{ mt: 3 }}>
              Tema modu, sitenizin genel görünümünü belirler. Karanlık mod, gece kullanımı için idealdir ve göz yorgunluğunu azaltır.
              Aydınlık mod ise gündüz kullanımı için daha uygundur.
            </Typography>
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => setActiveTab(1)}
              >
                Renk Ayarlarına Geç
              </Button>
            </Box>
          </Box>
        )}
        
        {/* Renkler Sekmesi */}
        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Özel Renk Ayarları
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Sitenizin renklerini özelleştirerek kendi tarzınızı yaratın. Değişiklikler anında önizlenecektir.
            </Typography>
            
            <Grid container spacing={2}>
              {colorOptions.map((option) => (
                <Grid item xs={12} sm={6} key={option.key}>
                  <TextField
                    fullWidth
                    label={option.label}
                    placeholder={option.defaultValue}
                    value={customColors[option.key] || ''}
                    onChange={(e) => handleColorChange(option.key, e.target.value)}
                    helperText={option.description}
                    margin="normal"
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              bgcolor: customColors[option.key] || option.defaultValue,
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              // Burada renk seçici açılabilir
                              setCurrentColorKey(option.key);
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<ResetIcon />}
                onClick={resetCustomColors}
              >
                Varsayılana Sıfırla
              </Button>
              
              <Box>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={applyCustomColors}
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  Değişiklikleri Kaydet
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        
        {/* Önizleme Sekmesi */}
        {activeTab === 2 && (
          <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Tema Önizleme
              </Typography>
              
              <Box>
                <Button
                  variant={previewMode ? "contained" : "outlined"}
                  color={previewMode ? "primary" : "inherit"}
                  onClick={togglePreview}
                  startIcon={previewMode ? <CheckIcon /> : null}
                  sx={{ mr: 1 }}
                >
                  {previewMode ? "Önizleme Aktif" : "Önizlemeyi Etkinleştir"}
                </Button>
                
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={applyCustomColors}
                >
                  Kaydet
                </Button>
              </Box>
            </Box>
            
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
                      <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                        Ana Buton
                      </Button>
                      <Button variant="outlined" color="primary">
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
              
              <Grid item xs={12}>
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Renk Paleti Önizleme
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {colorOptions.map((option) => (
                      <Grid item xs={6} sm={4} md={2} key={option.key}>
                        <Box
                          sx={{
                            bgcolor: customColors[option.key] || option.defaultValue,
                            height: 80,
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            p: 1,
                            boxShadow: 1
                          }}
                        >
                          <Typography variant="caption" sx={{ 
                            color: option.key.includes('bg') ? 'var(--text-primary)' : '#fff',
                            textShadow: '0 0 2px rgba(0,0,0,0.5)',
                            fontWeight: 'bold'
                          }}>
                            {option.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
      
      {/* Bildirim */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ThemeManager;
