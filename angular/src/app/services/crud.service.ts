import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebServiceService } from './web.services.service';
import { PermisosService } from './permisos.service';
import { Datarx } from '../models/datarx';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url:string;

    constructor(
      private http:HttpClient,
      private servidor: WebServiceService,
      private permisos:PermisosService){
        this.url=servidor.getUrl()
   }
  insert(endPoint: string,dataInsert:object):Array<any>{
  let returndata:Array<any>=[];
  this.http.post<Datarx>(`${this.url}${endPoint}`,dataInsert,this.servidor.getHeaders())
  .subscribe(data=>{
    if(data.transaccion){
      returndata =data.data;
      this.permisos.decodificarToken(data.token);
    }else{
       Swal.fire({
        position: 'top-right',
        icon:'error',
        title:`${data.msg}`,
        showConfirmButton: false,
        timer: 3000
      });
    }
  });
  return returndata;
  }

  delete(endPoint: string, _id: string): Array<any> {
    let returnData: Array<any> = [];
    this.http
      .delete<Datarx>(`${this.url}${endPoint}/${_id}`, this.servidor.getHeaders())
      .subscribe((data) => {
        if (data.transaccion) {
          returnData = data.data;
          this.permisos.decodificarToken(data.token);
        } else {
          alert(data.msg);
        }
      });
    return returnData;
  }
  update(endPoint: string, _id:string, data: object): Array<any> {
    let returnData: Array<any> = [];
    this.http.put<Datarx>(
        `${this.url}${endPoint}/${_id}`,data,this.servidor.getHeaders()
      ).subscribe(data => {
        console.log(data)
        if (data.transaccion) {
          returnData = data.data;
        } else {
        }
      });
    return returnData;
  }
  }
