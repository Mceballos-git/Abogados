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

  constructor(private activatedRoute:ActivatedRoute,
    private userService:UsersService) { 

      this.getUser(this.activatedRoute.snapshot.paramMap.get('id'));

      this.userForm = new FormGroup({
        'first_name': new FormControl('', Validators.required),
        'last_name': new FormControl('', Validators.required),
        'username': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")]),
        'role_list': new FormControl('', Validators.required),
        'active': new FormControl(),
        'degree': new FormControl(''),
        'position': new FormControl(''),
        'shift_start': new FormControl('', Validators.required),
        'shift_ends': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  getUser(id){
    this.userService.getOne(id).subscribe((response:any)=>{
      this.user = response;
      this.userForm.patchValue(this.user);
      console.log(this.user);     
      
    },(error)=>{
      console.log(error);
      
    })
  }

  editUser(){

  }

}
