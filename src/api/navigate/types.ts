export interface WaypointsInSystemResponseType {
  data: WaypointType[];
  meta: Meta;
}

interface Meta {
  total: number;
  page: number;
  limit: number;
}

export interface WaypointType {
  systemSymbol: string;
  symbol: string;
  type: string;
  x: number;
  y: number;
  orbitals: Orbital[];
  traits: Trait[];
  modifiers: string[];
  chart: Chart;
  faction: Orbital;
  isUnderConstruction: boolean;
}

interface Chart {
  submittedBy: string;
  submittedOn: string;
}

interface Trait {
  symbol: string;
  name: string;
  description: string;
}

interface Orbital {
  symbol: string;
}
