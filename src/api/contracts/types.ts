import { AgentType } from '../agent/types';

export interface ContractResponseType {
  data: ContractType[];
  meta: Meta;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface ContractType {
  id: string;
  factionSymbol: string;
  type: string;
  terms: Terms;
  accepted: boolean;
  fulfilled: boolean;
  expiration: string;
  deadlineToAccept: string;
}

interface Terms {
  deadline: string;
  payment: Payment;
  deliver: Deliver[];
}

interface Deliver {
  tradeSymbol: string;
  destinationSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

interface Payment {
  onAccepted: number;
  onFulfilled: number;
}

export interface ContractAcceptResponseType {
  data: ContractAcceptData;
}

interface ContractAcceptData {
  contract: ContractType;
  agent: AgentType;
}
