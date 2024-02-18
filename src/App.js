import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LeftSection onAddTask={handleAddTask} />
        </Grid>
        <Grid item xs={6}>
          <RightSection
            tasks={tasks}
            setTasks={setTasks}
            onDeleteTask={handleDeleteTask}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
