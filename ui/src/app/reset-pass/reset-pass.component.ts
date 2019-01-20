import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent {  

  resetForm: FormGroup;
  isLoading = false;
  resetOk:boolean=true;

  /**
   * Class constructor definition.
   * @param {Router} router
   * @param {AuthService} authService
   */
  constructor(private router: Router,
      private activatedRoute: ActivatedRoute,       
      private authService: AuthService,) {

      console.log(this.activatedRoute.snapshot.paramMap.get('token'));
        

      this.resetForm = new FormGroup({
          'token': new FormControl(this.activatedRoute.snapshot.paramMap.get('token')),
          'newPassword': new FormControl('', Validators.required),
          'newPassConfirm': new FormControl()
      })

      this.resetForm.controls['newPassConfirm'].setValidators([
        Validators.required,
        this.checkPasswords.bind(this.resetForm)
      ])



  }

  checkPasswords(group:FormGroup){
    
    let form:any = this;

    if(group.value !== form.controls['newPassword'].value){
      return{ notMatch : true} 
    }

    return null;
  }

  resetPassword(){   
    this.isLoading = true;
    
    if (!this.resetForm.valid) {
        this.isLoading = false;
        return false;
    }

    // Do send mail Request
    this.authService.resetPassword(this.resetForm.value).subscribe(
      (response) => { this.handleResetSuccess(response) },
      (response) => { this.handleResetError(response) }
    );
  }

  handleResetSuccess (response) {
    this.isLoading = false;
    this.resetForm.reset();
    console.log('reset password sucesfully, redirect to login');
    this.router.navigate(['login']);
  }

  /**
   * Handle reset request Response Failure.
   *
   * @param response
   */
  handleResetError (response) {
      this.isLoading = false;      
      console.log('There was an error while trying to reset pass');
      /**
     * Poner mensaje de error!!
     *
     * 
     */

      this.resetForm.reset();
  }

}
