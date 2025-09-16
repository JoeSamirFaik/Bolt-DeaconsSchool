import { useState, useEffect } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = { immediate: true }
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      setState({ data: null, loading: false, error: errorMessage });
    }
  };

  useEffect(() => {
    if (options.immediate) {
      fetchData();
    }
  }, []);

  return {
    ...state,
    refetch: fetchData,
  };
}

export function useMutation<T, P = any>(
  apiCall: (params: P) => Promise<T>
): {
  mutate: (params: P) => Promise<T>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (params: P): Promise<T> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(params);
      setLoading(false);
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      setError(errorMessage);
      setLoading(false);
      throw error;
    }
  };

  return { mutate, loading, error };
}