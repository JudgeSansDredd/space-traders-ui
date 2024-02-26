import { Fuel, Nav } from '../types';

export interface OrbitResponseType {
  data: {
    nav: Nav;
  };
}

export interface DockResponseType extends OrbitResponseType {}

export interface NavigateResponseType {
  data: {
    nav: Nav;
    fuel: Fuel;
  };
}
