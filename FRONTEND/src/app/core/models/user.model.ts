export interface User {
    msg(msg: any): unknown;
    
    _id:string,
    name:string,
    password:string,
    email:string,
    role:number
    administration:string

}