import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,} from '@angular/router';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  user:any;
  createuserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private CrudService:CrudService,) {
       if (sessionStorage.getItem("user")) {
       this.user=JSON.parse(sessionStorage.getItem("user"));
    }
  }
  ngOnInit(): void {
    this.createuserForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
       rol: ['', [Validators.required]],
       apellido: ['', [Validators.required]],
       edad: ['', [Validators.required]],
       email: ['', [Validators.required]],
    //   passw: ['', [Validators.required]],
    verifypassw: ['', [Validators.required]],
   });
  }
  update(){
    let nombre = this.createuserForm.get('nombre').value;
    let apellido = this.createuserForm.get('apellido').value;
    let edad = this.createuserForm.get('edad').value;
    let email = this.createuserForm.get('email').value;
//    let passw = this.createuserForm.get('passw').value;
    let rol = this.createuserForm.get('rol').value;
  //  let verifypassw = this.createuserForm.get('verifypassw').value;
    if (this.createuserForm.valid) {
    //  if (passw != verifypassw) {
    //    Swal.fire({
      //    position: 'center',
    //      icon: 'error',
      //    title: 'No conisiden las contraseñas',
    //      showConfirmButton: false,
      //    timer: 2000,
      //  });
      } else {
        let Data = {
          data: {
            nombre,
            apellido,
            edad,
            email,
          //  passw,
            rol,
          },
        };
        let user= this.CrudService.update(
       'update',this.user._id,Data);
       if (user) {
         console.log(this.user._id)
         console.log(Data)
         this.router.navigate(['/menu/usuarios']);
         localStorage.clear();
       }
     }
  //  } else {
  //    Swal.fire({
  //      position: 'center',
  //      icon: 'error',
  //      title: 'Todos los campos son requeridos',
    //    showConfirmButton: false,
    //    timer: 2000,
  //    });
//    }
  }
}
