import React, { useState } from 'react';
import { Box, Card, Paper, CircularProgress } from '@mui/material';
import { Task } from '@/types/types'; // Importing the Task type definition
import TaskCard from './TaskCard'; // Component for displaying individual task details

interface TaskTableProps {
  tasks: Task[]; // Array of tasks passed as a prop
  onStatusChange: (taskTitle: string, newStatus: string) => void; // Function to handle status changes
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onStatusChange }) => {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null); // State to track the task being dragged
  const [isDraggingOver, setIsDraggingOver] = useState<string | null>(null); // State to track the status being dragged over
  const [isLoading, setIsLoading] = useState<boolean>(false); // State to manage the loading indicator during status change

  // Group tasks by their status
  const statuses = Array.from(new Set(tasks.map(task => task.status))); // Extract unique statuses
  const groupedTasks = statuses.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status); // Group tasks by status
    return acc;
  }, {} as Record<string, Task[]>);

  // Handle the start of dragging a task
  const handleDragStart = (task: Task) => {
    setDraggedTask(task); // Set the dragged task in state
  };

  // Handle dragging over a status column
  const handleDragEnter = (status: string) => {
    setIsDraggingOver(status); // Set the dragging over status in state
  };

  // Handle leaving a status column while dragging
  const handleDragLeave = () => {
    setIsDraggingOver(null); // Reset the dragging over status
  };

  // Handle dropping a task in a new status column
  const handleDrop = (status: string) => {
    if (draggedTask) {
      setIsLoading(true); // Show loading spinner
      setTimeout(() => {
        onStatusChange(draggedTask.title, status); // Update the task's status
        setDraggedTask(null); // Reset dragged task
        setIsDraggingOver(null); // Reset dragging over status
        setIsLoading(false); // Hide loading spinner
      }, 500); // Simulate a delay (e.g., for network request)
    }
  };

  return (
<Box 
      display="flex" 
      flexDirection={{ xs: 'column', md: 'row' }} // Stack vertically on small screens
      gap={3} 
      flexWrap="wrap"
    >      {/* Loop through each status and display tasks under it */}
      {statuses.map(status => {
        const statusColor = status.replace(' ', '').toLowerCase(); // Prepare a class name based on status

        return (
          <Paper
            key={status}
            onDragOver={(e) => e.preventDefault()} // Allow dragging over the column
            onDrop={() => handleDrop(status)} // Handle dropping of a task
            onDragEnter={() => handleDragEnter(status)} // Handle entering a status column while dragging
            onDragLeave={handleDragLeave} // Handle leaving a status column while dragging
            sx={{ 
              px: 2, 
              flex: 1, 
              minWidth: '200px', 
              height: '600px', 
              overflowY: 'auto', 
              transition: 'transform 0.2s ease-in-out', 
              transform: isDraggingOver === status ? 'scale(1.05)' : 'scale(1)', // Slightly enlarge the column when dragging over
            }}
            className={statusColor === 'todo' 
              ? "border-t-8 border-status-todo" // Add border color based on status
              : statusColor === 'inprogress'
                ? 'border-t-8 border-status-inprogress' 
                : statusColor === 'done' 
                  ? 'border-t-8 border-status-done'
                  : 'border-t-8 border-status-unknown'}
          >
            <h1 className="sticky z-10 top-0 p-4 bg-white justify-center font-bold text-lg border-b">
              {status} {/* Display the status title */}
            </h1>

            {isLoading && isDraggingOver === status ? (
              <Box className="flex justify-center items-center h-full">
                <CircularProgress /> {/* Show a loading spinner if a task is being moved */}
              </Box>
            ) : (
              // Map over the tasks grouped by the current status and render each one
              groupedTasks[status]?.map(task => (
                <Card
                  key={task.title}
                  draggable // Make the task draggable
                  onDragStart={() => handleDragStart(task)} // Handle starting to drag a task
                  sx={{ 
                    p: 2, 
                    m: 2, 
                    backgroundColor:'#eef2f3',
                    transition: 'transform 0.2s ease-in-out', 
                    transform: draggedTask?.title === task.title ? 'rotate(5deg)' : 'rotate(0)', // Slightly rotate the task being dragged
                  }}
                  className="hover:cursor-move bg-slate-100"
                >
                  <TaskCard task={task} /> {/* Render the task details */}
                </Card>
              ))
            )}
          </Paper>
        );
      })}
    </Box>
  );
};

export default TaskTable;
