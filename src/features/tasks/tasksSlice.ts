// src/store/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Tasks } from '../../types/types';
import tasksData from '../../data/data.json';

interface TasksState {
  tasks: Tasks;
}

const initialState: TasksState = {
  tasks: tasksData,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action: PayloadAction<{ title: string; status: string }>) => {
      const task = state.tasks.find(task => task.title === action.payload.title);
      if (task) {
        task.status = action.payload.status;
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.title === action.payload.title);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTaskStatus, updateTask } = tasksSlice.actions;

export default tasksSlice.reducer;
