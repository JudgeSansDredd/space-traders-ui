import axios from 'axios';
import { ViewMarketResponseType } from './types';

export const viewMarket = async (waypointSymbol: string) => {
  const systemSymbol = waypointSymbol.split('-').slice(0, 2).join('-');
  const res = await axios.get<ViewMarketResponseType>(
    `/systems/${systemSymbol}/waypoints/${waypointSymbol}/market`
  );
  return res.data.data;
};
