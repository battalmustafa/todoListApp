import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import useFetch from '@/hooks/useFetch'; // Custom hook for fetching data
import { Task } from '@/types/types'; // Task type definition
import TaskTable from '@/components/common/TaskTable'; // Component for displaying tasks in a table
import NewTaskForm from '@/components/common/NewTaskForm'; // Form for adding a new task
import { useDispatch } from 'react-redux'; // Redux hook to dispatch actions
import { addTask } from './tasksSlice'; // Action to add a task in the Redux store
import AddTask from '@/components/common/AddTask'; // Component to add multiple tasks at once

const TaskBoard: React.FC = () => {
  // Destructure data, loading, error, and updateData from the useFetch hook
  const { data: tasks, loading, error, updateData } = useFetch<Task[]>('/data.json');
  const [taskState, setTaskState] = useState<Task[]>([]); // State to manage the tasks locally
  const dispatch = useDispatch(); // Initialize the dispatch function from Redux

  useEffect(() => {
    if (tasks) {
      setTaskState(tasks); // Set the local state when tasks are fetched
    }
  }, [tasks]); // Only run when the tasks data changes

  // Function to handle status changes in tasks
  const handleStatusChange = async (taskTitle: string, newStatus: string) => {
    const updatedTasks = taskState.map(task =>
      task.title === taskTitle ? { ...task, status: newStatus } : task
    );
    setTaskState(updatedTasks); // Update local state
    await updateData(updatedTasks); // Update the data in data.json
  };

  // Function to handle adding a new task
  const handleTaskAdded = (newTask: Task) => {
    dispatch(addTask(newTask)); // Dispatch the addTask action to Redux
    const updatedTasks = [...taskState, newTask]; // Add the new task to the local state
    setTaskState(updatedTasks); // Update local state
    updateData(updatedTasks); // Update the data in data.json
  };

  if (loading) return <p><LinearProgress /></p>; // Show a loading bar if data is being fetched
  if (error) return <p>Error: {error.message}</p>; // Show an error message if fetching fails

  return (
    <div className="p-4 space-y-8">
      {/* Display the tasks in a table and allow status changes */}
      <TaskTable tasks={taskState} onStatusChange={handleStatusChange} />
      
      {/* Form for adding a new task */}
      <NewTaskForm onTaskAdded={handleTaskAdded} />

      {/* Component for adding multiple tasks */}
      <AddTask onTasksAdded={updateData}/>
    </div>
  );
};

export default TaskBoard;
