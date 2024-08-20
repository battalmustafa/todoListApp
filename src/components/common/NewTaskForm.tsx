import React, { useState } from 'react';
import { Box, TextField, Typography, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { Task } from '@/types/types'; // Importing Task type
import { useSelector } from 'react-redux'; // To access Redux state
import { RootState } from '@/store/store'; // Importing RootState type for the store

interface NewTaskFormProps {
  onTaskAdded: (task: Task) => void; // Callback to add a new task
}

const NewTaskForm: React.FC<NewTaskFormProps> = ({ onTaskAdded }) => {
  // Retrieve tasks from the Redux store
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  // Extract unique statuses from existing tasks
  const statuses = Array.from(new Set(tasks.map(task => task.status)));
  
  // Local state to manage new task details
  const [task, setTask] = useState<Partial<Task>>({});
  const [error, setError] = useState<string | null>(null); // State for managing form errors

  // Handle input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update task state dynamically based on the input field's name
    setTask(prev => ({ ...prev, [name as keyof Task]: value }));
  };

  // Handle select changes for the status dropdown
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    // Update task state dynamically based on the select input's name
    setTask(prev => ({ ...prev, [name as keyof Task]: value }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const requiredFields: (keyof Task)[] = ['title', 'description', 'assignee', 'status'];
    
    // Check if any required fields are empty
    const hasEmptyFields = requiredFields.some(field => !task[field]);
  
    if (hasEmptyFields) {
      // If any required fields are missing, set an error message
      setError('Please fill out all fields.');
    } else {
      // If all fields are filled, call onTaskAdded to add the new task
      onTaskAdded(task as Task);
      setTask({}); // Reset the form
      setError(null); // Clear any existing error
    }
  };

  return (
    <Box 
      className='bg-white' // Tailwind class for background color
      sx={{ p: 3, boxShadow: 2, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h6">New Task</Typography>
      <TextField
        label="Title"
        name="title"
        value={task.title || ''} // Controlled input with default empty value
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={task.description || ''} // Controlled input with default empty value
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Assignee"
        name="assignee"
        value={task.assignee || ''} // Controlled input with default empty value
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={task.status || ''} // Controlled select with default empty value
          onChange={handleSelectChange}
          label="Status"
        >
          {statuses.map(status => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Display error alert if there is an error */}
      {error && <Alert onClose={() => setError(null)} severity="error">{error}</Alert>}
      <button 
        onClick={handleSubmit}
        className='text-gray-900 mt-2 font-semibold hover:bg-gray-900 hover:text-white px-4 py-2 bg-button-contrast rounded-lg'
      >
        Add Task
      </button>
    </Box>
  );
};

export default NewTaskForm;
