export interface User {
    msg(msg: any): unknown;
    name:string,
    password:string,
    email:string,
    expDate:string,
    accessToken:string,

}