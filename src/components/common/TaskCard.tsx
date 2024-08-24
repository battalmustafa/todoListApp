import React, { FC, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person'; // Icon to represent the assignee
import { Task } from '@/types/types'; // Importing the Task type definition
import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'; // Import MUI components

interface TaskDetailsProps {
  task: Task; // Props to receive a single task
  onStatusChange: (taskTitle: string, newStatus: string) => void; // Function to handle status change
  statuses: string[]; // Array of possible statuses
}

const TaskCard: FC<TaskDetailsProps> = ({ task, onStatusChange, statuses }) => {
  const [selectedStatus, setSelectedStatus] = useState(task.status); // State for the select box

  // Convert task status to a lower case string without spaces to use as a class name
  const statusColor = task.status.replace(' ', '').toLowerCase();

  // Handle status change
  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    onStatusChange(task.title, newStatus); // Call parent function to handle status change
  };

  return (
    <div className='relative grid grid-rows-3 gap-1 p-4'>
      {/* Status Select Box for Mobile View */}
      <div className='flex md:hidden'> {/* Hide on larger screens */}
        <FormControl size="small" variant="outlined" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            {statuses.map(status => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Header: Display task title and status */}
      <div className="flex justify-between items-center row-span-1 text-lg">
        <span className="font-bold">{task.title}</span> {/* Task title */}

        {/* Status indicator with dynamic background color based on status */}
        <span className={
          statusColor === 'todo'
            ? "bg-status-todo rounded text-sm items-center font-semibold text-gray-800 h-5 p-1 flex justify-center"
            : statusColor === 'inprogress'
              ? 'bg-status-inprogress rounded text-sm items-center font-semibold text-gray-800 h-5 p-1 flex justify-center'
              : statusColor === 'done'
                ? 'bg-status-done rounded text-sm items-center font-semibold text-gray-800 h-5 p-1 flex justify-center'
                : 'bg-status-unknown rounded text-sm items-center font-semibold text-gray-800 h-5 p-1 flex justify-center'
        }>
          {/* Empty span to act as a background color for status */}
        </span>
      </div>

      {/* Description: Show task description */}
      <div className="flex row-span-1">
        <span>{task.description}</span> {/* Task description */}
      </div>

      {/* Footer: Display assignee with icon */}
      <div className="flex border-t p-2 row-span-1 justify-between">
        <PersonIcon /> {/* Icon representing the person assigned to the task */}
        <span className="font-semibold">{task.assignee}</span> {/* Name of the assignee */}
      </div>
    </div>
  );
};

export default TaskCard;
