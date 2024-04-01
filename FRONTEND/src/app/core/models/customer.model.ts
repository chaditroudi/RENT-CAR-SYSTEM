export interface Customer {
  
    _id:string;
    passport_number: number;
    code:number;
    id_number: string;
    title: string;
    fullName: string;
    date_birth?: Date; 
    license_number: string;
    issued_by: string;
    issued_on: Date;
    expiry_date: Date;
    passport_expiry: Date;
    operation_balance?: number;
    mobile: string;
    telephone?: string; 
    email: string;
    QAR_address: string;
    permanent_address: string;
    person_name: string;
    home_country: string;
    nationality: string;
  }