import { useState, useEffect } from 'react';
import { getHardwares } from '../db/repositories/hardwareRepository';
import type { Hardware } from '../db/schema';

export function useHardwares() {
  const [data, setData] = useState<Hardware[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const hardwares = await getHardwares();
        if (isMounted) {
          setData(hardwares);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Erro desconhecido');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
