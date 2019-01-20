import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';


@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.component.html',
    styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {


    userForm: FormGroup;
    isLoading = false;


    constructor(private usersService: UsersService) {


        this.setDefaultValues();


    }

    ngOnInit() {

    }




    createUser() {
        this.isLoading=true;
        

    }


}
