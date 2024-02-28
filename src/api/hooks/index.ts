import { useQuery } from '@tanstack/react-query';
import { getShip } from '../ship';

export const useShipQuery = (shipSymbol: string | undefined) => {
  const shipQuery = useQuery({
    queryKey: ['ship', shipSymbol],
    queryFn: async () => {
      return getShip(shipSymbol);
    },
    staleTime: 10 * 60 * 1000,
  });

  return shipQuery;
};
