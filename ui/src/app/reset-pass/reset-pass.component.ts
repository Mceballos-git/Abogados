import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {

  resetForm: FormGroup;
  isLoading = false;

  constructor(private router: Router, 
    private loginService: AuthService,
    public snackBar:MatSnackBar) {

    this.resetForm = new FormGroup({
        'user': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
    })
}

reset(){
  
}
 

}
