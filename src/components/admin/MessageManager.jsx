import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon, Mail as MailIcon } from '@mui/icons-material';

const MessageManager = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      message: 'Projeniz hakkında bilgi almak istiyorum.',
      date: '2025-03-09 10:30',
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      message: 'İş birliği teklifim var.',
      date: '2025-03-08 15:45',
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      message: 'Portfolio sitenizi çok beğendim.',
      date: '2025-03-07 09:15',
    },
  ]);

  const handleDelete = (id) => {
    setMessages(messages.filter(message => message.id !== id));
    console.log('Mesaj silindi:', id);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Mesajlar
      </Typography>

      <Paper elevation={2}>
        <List>
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <Box key={message.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(message.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <MailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1">{message.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {message.date}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {message.email}
                        </Typography>
                        <Typography component="p" variant="body2">
                          {message.message}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < messages.length - 1 && <Divider variant="inset" component="li" />}
              </Box>
            ))
          ) : (
            <ListItem>
              <ListItemText 
                primary={<Typography variant="subtitle1" align="center">Hiç mesaj bulunamadı</Typography>} 
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default MessageManager;
