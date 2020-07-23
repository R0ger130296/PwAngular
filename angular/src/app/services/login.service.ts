import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web.services.service';
//import { PermisosService } from './permisos.service'
import { Observable } from 'rxjs';
import { Datarx } from '../models/datarx'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
private url:string;
  constructor(
    private http:HttpClient,
    private servidor:WebServiceService,
  //  private permisos: PermisosService,
  ) {
    this.url = this.servidor.getUrl();
   }

  login(datalogin: { data: { password: any; email: any; }; }):Observable<Datarx>{
   return this.http.post<Datarx>(`${this.url}login`, datalogin);
  }
  // login(datalogin):Observable<Datarx>{
    //  return this.http.post<Datarx>(`${this.url}login`, datalogin);
     //}
}
