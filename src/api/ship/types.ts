import { AgentType } from '../agent/types';

export interface ShipReturnType {
  data: ShipType[];
  meta: Meta;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface ShipType {
  symbol: string;
  nav: Nav;
  crew: Crew;
  fuel: Fuel;
  cooldown: Cooldown;
  frame: Frame;
  reactor: Reactor;
  engine: Engine;
  modules: Module[];
  mounts: Mount[];
  registration: Registration;
  cargo: Cargo;
}

interface Cargo {
  capacity: number;
  units: number;
  inventory: Inventory[];
}

interface Inventory {
  good: string;
  quantity: number;
}

interface Registration {
  name: string;
  factionSymbol: string;
  role: string;
}

interface Mount {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  requirements: Requirements;
  deposits?: string[];
}

interface Module {
  symbol: string;
  name: string;
  description: string;
  capacity?: number;
  requirements: Requirements3;
}

interface Requirements3 {
  crew: number;
  power: number;
  slots: number;
}

interface Engine {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: Requirements;
}

interface Reactor {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: Requirements2;
}

interface Requirements2 {
  crew: number;
}

interface Frame {
  symbol: string;
  name: string;
  description: string;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  condition: number;
  requirements: Requirements;
}

interface Requirements {
  power: number;
  crew: number;
}

interface Cooldown {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
}

export interface Fuel {
  current: number;
  capacity: number;
  consumed: Consumed;
}

interface Consumed {
  amount: number;
  timestamp: string;
}

interface Crew {
  current: number;
  capacity: number;
  required: number;
  rotation: string;
  morale: number;
  wages: number;
}

export interface Nav {
  systemSymbol: string;
  waypointSymbol: string;
  route: Route;
  status: string;
  flightMode: string;
}

interface Route {
  departure: Departure;
  origin: Departure;
  destination: Departure;
  arrival: string;
  departureTime: string;
}

interface Departure {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

export interface ExtractResponseType {
  data: {
    extraction: Extraction;
    cooldown: Cooldown;
    cargo: Cargo;
  };
}

interface Cargo {
  capacity: number;
  units: number;
  inventory: Inventory[];
}

interface Extraction {
  shipSymbol: string;
  yield: Yield;
}

interface Yield {
  symbol: string;
  units: number;
}

export interface RefuelResponseType {
  data: {
    agent: AgentType;
    fuel: Fuel;
    transaction: Transaction;
  };
}

interface Transaction {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: string;
}
