export interface Car {
    _id : number;
    next_service: Date;
    insurance: string;
    registration: string;
    engine_no: string;
    chassis_no: string;
    fuel: string;
    comment: string;
    out_of_service: boolean;
    petrol_charge: number;
    daily: string;
    weekly: string;
    monthly: string;
    annual: string;
}