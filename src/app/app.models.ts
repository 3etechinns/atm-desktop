export interface AuthResponse {
  access_token: string;
  token: string;
  expires_in: number;
}

export interface ATMData {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: number;
  bank_id: number;
  city: string;
}

export interface BankData {
  id: number;
  name: string;
  email: string;
  desc: string;
  country: string;
  city: string;
}

export interface ATMQuery {
  id?: string;
  name?: string;
}

export interface ManagerData {
  name: string;
  email: string;
  bank_id: string;
}
