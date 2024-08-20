import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '@/types/types';
import { updateTask } from '@/features/tasks/tasksSlice';

type FetchResult<T> = {
  data: T | null;           // Holds the fetched data
  loading: boolean;         // Indicates loading state
  error: Error | null;      // Stores any error encountered during fetch or update
  updateData: (newData: T) => Promise<void>; // Function to update the data
};

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch(); // Get dispatch function from Redux

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: T) => {
        setData(data);          // Sets the fetched data
        setLoading(false);      // Ends loading state
      })
      .catch((error: Error) => {
        setError(error);        // Sets error state
        setLoading(false);      // Ends loading state
      });
  }, [url]);

  const updateData = async (newData: T) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Failed to update data'); // Handles non-successful responses
      }
      
      // Dispatch action to update task in Redux store
      dispatch(updateTask(newData as Task)); 

      setData(newData); // Updates state with new data
    } catch (err) {
      setError(err as Error); // Sets error state
    } finally {
      setLoading(false); // Ends loading state
    }
  };

  return { data, loading, error, updateData };
};

export default useFetch;
