import { Car } from "./car.model";
import { Customer } from "./customer.model";

export interface Contract {
  _id?:string;
    serial?: number;
    car: Car;
    version: number;
    sponsor: string;
    car_out?: Date;
    car_back?: Date;
    select_one: string;
    deposit: string;
    location: string;
    owner: Customer;
    status_contract:string;
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
    features?: Features[];
    features_back?:Features[];
    daily_val1?: number;
    daily_val2?: number;
    daily_result?: number;
    sum?: number;
    discount?: number;
    advance?: number;
    payable?: number;
    status?:string;
    amount:number;


  }
  

  export class Features {
    checked:boolean;
    id:string;
    label:string

    constructor(item:string,isChecked:boolean,id:string) {
      this.checked= isChecked;
      this.label = item;
      this.id = id;
    }
  }


