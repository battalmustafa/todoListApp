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
  },
});

export const { addTask, updateTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
