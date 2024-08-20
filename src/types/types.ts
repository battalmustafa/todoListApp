export interface Task {
    title: string;
    description: string;
    status: string;
    assignee: string;
  }
  
  export type Tasks = Task[];
  
  export interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
  }
  