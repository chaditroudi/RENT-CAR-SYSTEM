import {Car} from './car.model';
import {Contract} from './contract.model';


export interface Report{
    _id?:string,
    car:string,
    contract:string
}