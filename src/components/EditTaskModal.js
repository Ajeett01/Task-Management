import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const EditTaskModal = ({
  Tasks,
  setTasks,
  onClose,
  editIndex,
  taskToEdit,
  handleSaveTask,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  useEffect(() => {
    setNewTitle(taskToEdit.title);
    setNewDesc(taskToEdit.description);
  }, []);

  const handleSaveChanges = () => {
    const updatedTask = {
      ...taskToEdit,
      title: newTitle,
      description: newDesc,
    };
    const updatedTasks = Tasks.map((task, index) =>
      index === editIndex ? updatedTask : task
    );
    setTasks(updatedTasks);
    handleSaveTask();
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md">
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginBottom: 16, marginTop: 12 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
