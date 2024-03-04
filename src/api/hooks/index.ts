import { useQuery } from '@tanstack/react-query';
import { verifyToken } from '../agent';
import { getWaypointsInSystem } from '../navigate';
import { getShip } from '../ship';

export const useShipQuery = (shipSymbol: string | undefined) => {
  const shipQuery = useQuery({
    queryKey: ['ships', shipSymbol],
    queryFn: async () => {
      return getShip(shipSymbol);
    },
    staleTime: 1000 * 60 * 5,
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

export const useVerifyQuery = (authToken: string | null) => {
  const verifyQuery = useQuery({
    queryKey: ['verify', authToken],
    queryFn: () => {
      return verifyToken();
    },
    enabled: !!authToken,
    staleTime: 1000 * 60 * 5,
  });

  return verifyQuery;
};
