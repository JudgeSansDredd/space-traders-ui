import { useQuery } from '@tanstack/react-query';
import { getWaypointsInSystem } from '../navigate';
import { getShip } from '../ship';

export const useShipQuery = (shipSymbol: string | undefined) => {
  const shipQuery = useQuery({
    queryKey: ['ship', shipSymbol],
    queryFn: async () => {
      return getShip(shipSymbol);
    },
    refetchInterval: 30 * 1000,
  });

  return shipQuery;
};

export const useWaypointsQuery = (systemSymbol: string | undefined) => {
  const waypointsQuery = useQuery({
    queryKey: ['systemWaypoints', systemSymbol],
    queryFn: async () => {
      return getWaypointsInSystem(systemSymbol);
    },
    staleTime: 1000 * 60 * 5,
  });

  return waypointsQuery;
};
