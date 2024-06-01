import { HttpHeaders } from "@angular/common/http";

import { environment } from '../../../environments/environment';


//export const baseUrl = 'http://localhost:3200/api';



export  const baseUrl= environment.API_URL;

export   const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  
	