import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

class User{
  username: string
  email : string
  role_list: string[]
  active : number
  first_name : string
  last_name : string
  degree : string
  position: string
  shift_start: string
  shift_ends: string
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user:User;
  userForm: FormGroup;
  isLoading = false;
  id_user;

  constructor(private activatedRoute:ActivatedRoute,
    private userService:UsersService) { 

      this.id_user = this.activatedRoute.snapshot.paramMap.get('id');

      this.getUser(this.id_user);

      this.userForm = new FormGroup({
        'first_name': new FormControl('', Validators.required),
        'last_name': new FormControl('', Validators.required),
        'username': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")]),
        'role_list': new FormControl('', Validators.required),
        'active': new FormControl(),
        'degree': new FormControl('', Validators.required),
        'position': new FormControl('', Validators.required),
        'shift_start': new FormControl('', Validators.required),
        'shift_end': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  getUser(id){
    this.userService.getOne(id).subscribe((response:any)=>{
      response.role_list = this.userService.getRoleFromArray(response.role_list);
      this.user = response;
      this.userForm.patchValue(this.user);             
      console.log(this.user);     
      
    },(error)=>{
      console.log(error);
      
    })
  }

  editUser(){
    this.isLoading=true;
    this.userService.updateUser(this.id_user, this.userForm.value).subscribe((response) => {
        this.isLoading=false;
        this.userForm.reset();
        console.log('user edited ok');

    }, (error) => {
        this.isLoading=false;
        console.log('error al editar usuario' + error);

    });

  }

}
