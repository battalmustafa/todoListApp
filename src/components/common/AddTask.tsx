import React, { useState } from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import { Task } from '@/types/types';

interface AddTasksProps {
  onTasksAdded: (newTasks: Task[]) => void; // Callback to add multiple tasks
}

const AddTasks: React.FC<AddTasksProps> = ({ onTasksAdded }) => {
  // Local state for the JSON input and error messages
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Handle the process of adding tasks
  const handleAddTasks = () => {
    try {
      // Attempt to parse the JSON input
      const parsedTasks: Task[] = JSON.parse(jsonInput);
      
      // Validate if the parsed data is an array and contains valid task objects
      if (!Array.isArray(parsedTasks) || parsedTasks.some(task => !task.title || !task.description || !task.status || !task.assignee)) {
        setError('Invalid JSON structure. Please ensure it contains an array of valid tasks.');
        return;
      }

      // If validation passes, call onTasksAdded to add the new tasks
      onTasksAdded(parsedTasks);
      setJsonInput(''); // Clear the input field
      setError(null); // Reset error state
    } catch (err) {
      // Set an error if JSON parsing fails
      setError('Invalid JSON format. Please check your input.');
    }
  };

  return (
    <Box
      className="bg-white" // Tailwind class for background color
      sx={{
        boxShadow: 2,
        borderRadius: 2,
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        mt: 4
      }}
    >
      <Typography variant="h6">Add Tasks</Typography>
      <TextField
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)} // Update JSON input state on change
        placeholder='Enter tasks as JSON. Example: [{"title": "New Task", "description": "Task description", "status": "To Do", "assignee": "John Doe"}]'
        error={Boolean(error)} // Display error state in the TextField if an error exists
      />
      {/* Display an error alert if there's an error */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <button
        className='text-gray-900 font-semibold hover:bg-gray-900 hover:text-white px-4 py-2 bg-button-contrast rounded-lg'
        onClick={handleAddTasks} // Trigger task addition on button click
      >
        Add Tasks
      </button>
    </Box>
  );
};

export default AddTasks;
