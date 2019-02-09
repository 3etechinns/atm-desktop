import { Coordinate } from './coordinate';

export class Report {
  id: string;
  atmCoordinates: Coordinate;
  bankID: string;
  iscardstuck: boolean;
  isfaulty: boolean;
  isoutofCash: boolean;
  isproblemaccess: boolean;
  myLocation: Coordinate;
  personContact: string;
  personLocation: string;
  personName: string;
  query: string;
  timeReported: string;
}
