import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';

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
      private authService: AuthService,) {

      this.resetForm = new FormGroup({
          'token': new FormControl(this.authService.token),
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

  newPass(){

  }

}
