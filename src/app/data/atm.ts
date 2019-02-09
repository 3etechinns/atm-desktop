import { Coordinate } from './coordinate';

export class ATM {
  localizedName: string;
  region: string;
  locality: string;
  bank_id: string;
  bank_name: string;
  location: Coordinate;
  status: number;
  atm_id: string;
  timeAdded: number;
  lasttimeUpdated: number;
  distance: number;
}
