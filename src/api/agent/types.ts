import { ContractType } from '../contracts/types';
import { ShipType } from '../ship/types';

export interface RegisterResponseType {
  data: RegistrationType;
}

export interface RegistrationType {
  token: string;
  agent: AgentType;
  contract: ContractType;
  faction: Faction;
  ship: ShipType;
}

interface Faction {
  symbol: string;
  name: string;
  description: string;
  headquarters: string;
  traits: Trait[];
  isRecruiting: boolean;
}

interface Trait {
  symbol: string;
  name: string;
  description: string;
}

export interface AgentType {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}

export interface VerifyTokenResponseType {
  data: AgentType;
}
