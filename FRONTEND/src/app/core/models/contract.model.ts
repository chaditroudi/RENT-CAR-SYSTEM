export interface Contract {
    serial?: number;
    car: string;
    version: number;
    sponsor: string;
    car_out?: Date;
    car_back?: Date;
    select_one: string;
    deposit: string;
    location: string;
    hirer: string;
    comments?: string;
    daily?: number;
    monthly?: number;
    days:number;
    weekly?: number;
    annual?: number;
    fuel_out?: string;
    no_km_out?: string;
    fuel_back: string;
    no_km_back: string;
    features?: string[];
    daily_val1?: number;
    daily_val2?: number;
    daily_result?: number;
    sum?: number;
    discount?: number;
    advance?: number;
    payable?: number;
  }
  