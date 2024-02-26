import axios from 'axios';
import {
  AgentType,
  RegisterResponseType,
  VerifyTokenResponseType,
} from './types';

export const register = async (symbol: string, faction: string) => {
  const res = await axios.post<RegisterResponseType>('/register', {
    symbol,
    faction,
  });
  return res.data;
};

export const verifyToken = async (): Promise<AgentType> => {
  const response = await axios.get<VerifyTokenResponseType>('/my/agent');
  return response.data.data;
};
