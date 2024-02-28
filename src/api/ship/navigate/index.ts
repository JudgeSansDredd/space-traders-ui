import axios from 'axios';
import { NavigateResponseType, OrbitResponseType } from './types';

export const orbit = async (id: string) => {
  const res = await axios.post<OrbitResponseType>(`/my/ships/${id}/orbit`);
  return res.data.data.nav;
};

export const dock = async (id: string) => {
  const res = await axios.post<OrbitResponseType>(`/my/ships/${id}/dock`);
  return res.data.data.nav;
};

export const navigate = async (
  id: string | undefined,
  waypointSymbol: string
) => {
  if (!id) throw new Error('No ship id provided');
  const res = await axios.post<NavigateResponseType>(
    `/my/ships/${id}/navigate`,
    { waypointSymbol }
  );
  return res.data;
};
