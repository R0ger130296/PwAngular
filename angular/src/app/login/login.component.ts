import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PermisosService } from '../services/permisos.service'
import { Datarx } from '../models/datarx'
import { LoginService } from '../services/login.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginData: FormGroup;
  constructor(
    private loginServices:LoginService,
    private permisos: PermisosService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginData = this.formBuilder.group({
     email:["admi@gmail.com",Validators.required],
     password:["1",Validators.required],
 });
  }
  login():void{
    let email =this.loginData.get('email').value;
    let password =this.loginData.get('password').value;
    let datalogin = {
      data:{
        password,
        email
      }
    };
      this.loginServices.login(datalogin).subscribe((data:Datarx)=>{
    if(data.transaccion){
      if(this.permisos.decodificarToken(data.token)){
        this.router.navigate(['/menu']);
      }else{
       email='';
        password='';
        Swal.fire({
          position: 'top-right',
          icon:'error',
          title:`${data.msg}`,
          showConfirmButton: false,
          timer: 3000
        });
      }
    } (error:String)=>{
      email='';
        password='';
    Swal.fire({
        position: 'top-right',
        icon:'error',
        title:`${error}`,
        showConfirmButton: false,
        timer: 3000
      });
    };
  });
  }
}
