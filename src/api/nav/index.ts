import axios from 'axios';
import { WaypointsInSystemResponseType } from './types';

// TODO: Type this response
export const getWaypointsInSystem = async (
  systemSymbol: string | undefined
): Promise<WaypointsInSystemResponseType | null> => {
  if (!systemSymbol) return null;
  const response = await axios.get<WaypointsInSystemResponseType>(
    `/systems/${systemSymbol}/waypoints`
  );
  return response.data;
};
