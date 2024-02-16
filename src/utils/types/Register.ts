export interface RegisterResponseType {
  token: string;
  agent: Agent;
  contract: Contract;
  faction: Faction;
  ship: Ship;
}

interface Ship {
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
  inventory: any[];
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

interface Fuel {
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

interface Nav {
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

interface Contract {
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

interface Agent {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
  shipCount: number;
}
