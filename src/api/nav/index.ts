import axios from 'axios';
import { WaypointsInSystemResponseType } from './types';

// TODO: Type this response
export const getWaypointsInSystem = async (systemSymbol: string) => {
  const response = await axios.get<WaypointsInSystemResponseType>(
    `/systems/${systemSymbol}/waypoints`
  );
  return response.data;
};
