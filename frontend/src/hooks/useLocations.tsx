import { get } from '@/Fetch';
import { Location } from '@/types';
import { useState, useEffect } from 'react';

const useLocations = () => {
  const [data, setData] = useState<Location[] | null>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      try {
        const response = (await get({
          url: 'api/menu/getLocations',
        })) as Location[];
        setData(response);
        setError(null);
      } catch (err) {
        setError(err as Error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return { data, error, loading };
};

export default useLocations;
