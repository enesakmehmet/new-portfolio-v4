import { Box, Typography, Grid, Paper } from '@mui/material';
import { Assessment, People, Work, Mail } from '@mui/icons-material';

const DashboardHome = () => {
  const stats = [
    { title: 'Toplam Proje', value: '12', icon: Work, color: '#2196f3' },
    { title: 'Toplam Ziyaretçi', value: '1,234', icon: People, color: '#4caf50' },
    { title: 'Yeni Mesajlar', value: '23', icon: Mail, color: '#ff9800' },
    { title: 'Aktif Projeler', value: '8', icon: Assessment, color: '#f44336' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hoş Geldiniz
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Paper
                sx={{
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 2,
                }}
                elevation={2}
              >
                <IconComponentgit
                  sx={{
                    fontSize: 40,
                    color: stat.color,
                    mb: 1,
                  }}
                />
                <Typography variant="h4" component="div" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DashboardHome;
