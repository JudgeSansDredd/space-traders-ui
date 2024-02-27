import { useQuery } from '@tanstack/react-query';
import { verifyToken } from '../agent';
import { getShip } from '../ship';

export const useVerifyQuery = (authToken: string) => {
  return useQuery({
    queryKey: ['verify', authToken],
    queryFn: () => {
      return verifyToken();
    },
    enabled: !!authToken,
  });
};

export const useShipQuery = (shipSymbol: string) => {
  const shipQuery = useQuery({
    queryKey: ['ship', shipSymbol],
    queryFn: async () => {
      return getShip(shipSymbol || '');
    },
    staleTime: 10 * 60 * 1000,
  });

  return shipQuery;
};
