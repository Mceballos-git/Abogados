import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  forma:FormGroup;

  constructor(private router:Router,
      private _loginService:LoginService) {

        this.forma = new FormGroup({
          'user' :new FormControl('', Validators.required),
          'pass':new FormControl('', Validators.required)
        })
    }



  login(){

    console.log(this.forma.value);
    this.router.navigate(['menuprin']);
    this.forma.reset();
  }

}
