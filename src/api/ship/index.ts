import axios from 'axios';
import {
  ExtractResponseType,
  RefuelResponseType,
  ShipReturnType,
  ShipType,
} from './types';

export const getShips = async (): Promise<ShipType[]> => {
  const res = await axios.get<ShipReturnType>('/my/ships');
  // Filter out starting probe ship
  const ships = res.data.data.filter((ship) => ship.frame.name !== 'Probe');
  return ships;
};

export const getShip = async (
  shipId: string | undefined
): Promise<ShipType | null> => {
  if (!shipId) return null;
  const res = await axios.get<{ data: ShipType }>(`/my/ships/${shipId}`);
  return res.data.data;
};

export const extract = async (
  shipId: string
): Promise<ExtractResponseType['data']> => {
  const res = await axios.post<ExtractResponseType>(
    `/my/ships/${shipId}/extract`
  );
  return res.data.data;
};

export const refuel = async (
  shipId: string
): Promise<RefuelResponseType['data']> => {
  const res = await axios.post<RefuelResponseType>(
    `/my/ships/${shipId}/refuel`
  );
  return res.data.data;
};
