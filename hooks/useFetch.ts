import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = <T>(url: string, mapper?: (data: any) => T) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const result = mapper ? mapper(response.data) : (response.data as T); 
        setData(result);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, mapper]);

  return { data, loading, error };
};

export default useFetch;