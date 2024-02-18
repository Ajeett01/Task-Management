import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox, // Import Checkbox component
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TaskDetails from './TaskDetails';
import EditTaskModal from './EditTaskModal';

const RightSection = ({ tasks, setTasks, onDeleteTask }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [filterType, setFilterType] = useState('all'); // State variable to track the filter type

  const handleSaveTask = (index) => {
    setEditIndex(-1);
    setSelectedTask(null);
    setShowEditModal(false);
  };

  const onEditClick = (index, task) => {
    setEditIndex(index);
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const onToggleStatus = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = updatedTasks[index].status === 'Complete' ? 'Pending' : 'Complete';
    setTasks(updatedTasks);
  };

  const clickDetails = (task) => {
    setShowDetailsModal(true);
    setDetailTask(task);
  };

  // Function to filter tasks based on the filter type
  const filteredTasks = () => {
    if (filterType === 'complete') {
      return tasks.filter((task) => task.status === 'Complete');
    } else if (filterType === 'pending') {
      return tasks.filter((task) => task.status !== 'Complete');
    } else {
      return tasks;
    }
  };

  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ backgroundColor: '#f0f0f0', width: '600px', padding: '16px' }}>
        <Typography variant="h5" align="center" sx={{ mb: 2 }}>
          Tasks List
        </Typography>
        {tasks.length > 0 && (
          <FormControl sx={{ mb: 2 }}>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="complete">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        )}
        
        <List>
          {filteredTasks().map((task, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  borderBottom: '1px solid #ccc',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <>
                  <ListItemText
                    primary={task.title}
                    onClick={() => clickDetails(task)}
                    style={{ cursor: 'pointer' }}
                  />
                  <ListItemSecondaryAction>
                    {/* Replace Button with Checkbox */}
                    <Checkbox
                      checked={task.status === 'Complete'}
                      onChange={() => onToggleStatus(index)}
                      color="primary"
                    />
                    <IconButton
                      edge="end"
                      onClick={() => onEditClick(index, task)}
                    >
                      <EditIcon sx={{ color: 'blue' }} />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onDeleteTask(index)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {showEditModal && selectedTask && (
        <EditTaskModal
          Tasks={tasks}
          setTasks={setTasks}
          taskToEdit={selectedTask}
          handleSaveTask={handleSaveTask}
          onClose={() => setShowEditModal(false)}
          editIndex={editIndex}
        />
      )}
      {showDetailsModal && (
        <TaskDetails
          task={detailTask}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
    </Box>
  );
};

export default RightSection;
