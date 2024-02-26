import axios from 'axios';

import {
  ContractAcceptResponseType,
  ContractResponseType,
  ContractType,
} from './types';

export const getContracts = async (): Promise<ContractType[]> => {
  const res = await axios.get<ContractResponseType>('/my/contracts');
  const contracts = res.data.data;
  return contracts;
};

export const acceptContract = async (id: string): Promise<ContractType> => {
  const res = await axios.post<ContractAcceptResponseType>(
    `/my/contracts/${id}/accept`
  );
  return res.data.data.contract;
};