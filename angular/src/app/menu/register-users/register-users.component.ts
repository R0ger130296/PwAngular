import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { CrudService } from '../../services/crud.service';
import { PermisosService } from '../../services/permisos.service';
import { Datarx } from '../../models/datarx';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileService } from '../../services/files.service';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  providers: [NgxSpinnerService],
})
export class RegisterUsersComponent implements OnInit {
 createuserForm: FormGroup;
 navigationSubcription;
 verFile: any;
  constructor(
   private formBuilder: FormBuilder,
   private http: HttpClient,
   private router: Router,
   private cudService: CrudService,
   private permisosService: PermisosService,
   private spinner: NgxSpinnerService,
    private fileService: FileService,
  ) {this.navigationSubcription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
   }
   changeFile(event): void {
     let imagen = this.createuserForm.get('file').value;
     if (imagen !== 'M3RSqMLHQB4ZBqpz9rpwrY7q.png') {
       this.fileService.deleteFile('galeria', imagen);
     }
     const filename = event.target.files;
     console.log(filename)
     this.fileService.guardarFile(filename).subscribe((data:Datarx)=>{
       console.log(data)
       if(data.transaccion){
         imagen = data.data[0];
         console.log(imagen)
         this.verFile=this.fileService.obtenerFile('galeria',imagen)
       }
     })
   }
  ngOnInit(): void {
    this.createuserForm = this.formBuilder.group({
    nombre: ['', [Validators.required]],
     rol: ['', [Validators.required]],
     apellido: ['', [Validators.required]],
     edad: ['', [Validators.required]],
     email: ['', [Validators.required]],
     passw: ['', [Validators.required]],
     verifypassw: ['', [Validators.required]],
     file: ['', [Validators.required]],
   });
   this.verFile = this.fileService.obtenerFile(
     'galeria',
     'M3RSqMLHQB4ZBqpz9rpwrY7q.png'
   );
  }
  createUser(){
  let nombre = this.createuserForm.get('nombre').value;
    let apellido = this.createuserForm.get('apellido').value;
    let edad = this.createuserForm.get('edad').value;
    let email = this.createuserForm.get('email').value;
    let passw = this.createuserForm.get('passw').value;
    let rol = this.createuserForm.get('rol').value;
    let verifypassw = this.createuserForm.get('verifypassw').value;
    if (this.createuserForm.valid) {
      if (passw != verifypassw) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No conisiden las contraseñas',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        let datos = {
          data: {
            nombre,
            apellido,
            edad,
            email,
            passw,
            rol,
          },
        };
        let user = this.cudService.insert('insert', datos);
        if (user) {
            this.router.navigate(['/menu/usuarios']);
        }
      }
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
}
