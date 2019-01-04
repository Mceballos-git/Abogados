import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material'

@Component({
  selector: 'app-mail-reset-pass',
  templateUrl: './mail-reset-pass.component.html',
  styleUrls: ['./mail-reset-pass.component.css']
})
export class MailResetPassComponent {

  resetForm: FormGroup;
  isLoading = false;
  mailOk=false;
  mailNotOk=false;

  constructor(private router: Router, 
    private authService: AuthService,
    public snackBar:MatSnackBar) {

    this.resetForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")])
    })
  }


  forgotPassword(){  
    this.isLoading = true;
    
    if (!this.resetForm.valid) {
        this.isLoading = false;
        return false;
    }

    // Do send mail Request
    this.authService.forgotPassword(this.resetForm.value).subscribe(
      (response) => { this.handleResetSuccess(response) },
      (response) => { this.handleResetError(response) }
    );
  }

  /**
     * Handle reset request Response Failure.
     *
     * @param response
     */
    handleResetSuccess (response) {
      this.isLoading = false;
      this.resetForm.reset();
      this.mailOk=true;
      this.mailNotOk=false;
      console.log('send mail sucesfully, redirect to login');
      //this.router.navigate(['login']);
  }

  /**
   * Handle reset request Response Failure.
   *
   * @param response
   */
  handleResetError (response) {
      this.isLoading = false;      
      console.log('There was an error while trying to send email to reset pass');
      this.mailOk=false;
      this.mailNotOk=true;
      this.resetForm.reset();
  }
  
  resetError(){
    this.mailNotOk=false;
    this.mailOk=false;
    console.log("reserterror");
    
  }
 




  
 
}
