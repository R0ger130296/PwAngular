import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { PermisosService } from '../../services/permisos.service';
import { WebServiceService } from '../../services/web.services.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http'
import { Router,NavigationEnd} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  providers: [NgxSpinnerService],
})
export class UsuariosComponent implements OnInit {
  user=[];
  navigationSubcription;
  private url:string;
    constructor(
      private crudService:CrudService,
      private permisosService:PermisosService,
      private servidor: WebServiceService,
      private permisos:PermisosService,
      private router:Router,
      private spinner: NgxSpinnerService,
      private http:HttpClient) {
      this.url=servidor.getUrl();
      this.navigationSubcription = this.router.events.subscribe((e: any) => {
          if (e instanceof NavigationEnd) {
            this.spinner.show();
            setTimeout(() => {
              this.spinner.hide();
            }, 800);
          }
        });
    }

    ngOnInit(): void {
     this.getUsers();
    }
    getUsers(): void {
      this.http
        .get(`${this.url}usuarios`)
        .subscribe((data: any) => {
          data.data.forEach((element) => {
            this.user.push(element);
          });
        });
    }
    public edit(user): void {
       sessionStorage.setItem('user', JSON.stringify(user));
       this.router.navigate(['/menu/edit-users']);
     }

     delet_user(_id) {
       console.log(_id)
       this.crudService.delete('usuario_delete', _id);
         this.navigationSubcription = this.router.events.subscribe((e: any) => {
             if (e instanceof NavigationEnd) {
               this.spinner.show();
               setTimeout(() => {
                 this.spinner.hide();
               }, 800);
             }
           });
   }
}
