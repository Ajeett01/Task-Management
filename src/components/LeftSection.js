import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

const LeftSection = ({ onAddTask }) => {
  const [title, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const status = 'Pending'; // Hardcoded status as 'Pending'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const newTask = {
        title: title,
        description: description,
        status: status,
      };
      onAddTask(newTask);
      setTitleName('');
      setDescription('');
    }
  };

  return (
    <Box p={2}>
      <Paper elevation={3}>
        <Typography variant="h5" align="center" sx={{ p: 2 }}>
          Add Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box p={2}>
            <TextField
              label="Task Name"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitleName(e.target.value)}
            />
          </Box>
          <Box p={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box p={2} textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LeftSection;
