import React, { FC } from 'react';
import PersonIcon from '@mui/icons-material/Person'; // Icon to represent the assignee
import { Task } from '@/types/types'; // Importing the Task type definition

interface TaskDetailsProps {
  task: Task // Props to receive a single task
}

const TaskCard: FC<TaskDetailsProps> = ({ task }) => {
    // Convert task status to a lower case string without spaces to use as a class name
    const statusColor = task.status.replace(' ', '').toLowerCase();

  return (
    <div className='grid grid-rows-3 gap-1'>
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
        <PersonIcon/> {/* Icon representing the person assigned to the task */}
        <span className="font-semibold">{task.assignee}</span> {/* Name of the assignee */}
      </div>
    </div>
  );
};

export default TaskCard;
