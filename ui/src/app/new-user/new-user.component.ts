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
            'shift_ends': new FormControl('', Validators.required)
        });

        this.setDefaultValues();


    }

    ngOnInit() {

    }


    setDefaultValues() {
        this.userForm.patchValue({role_list: 'operator', active: true});
    }

    createUser() {
        this.isLoading=true;
        this.usersService.create(this.userForm.value).subscribe((response) => {
            this.isLoading=false;
            this.userForm.reset();
            console.log('user created ok');

        }, (error) => {
            this.isLoading=false;
            console.log('error al crear usuario' + error);

        });

    }


}
