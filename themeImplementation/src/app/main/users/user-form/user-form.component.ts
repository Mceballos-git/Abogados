import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {



        // this._usersService.getUsersList().subscribe(response => {
        //     this.users = response;
        //     this.loaded = true;
        //
        //     // Assign the data to the data source for the table to render
        //     this.dataSource = new MatTableDataSource(this.users);
        //     this.dataSource.paginator = this.paginator;
        //     this.dataSource.sort = this.sort;
        //
        //     this.dtTrigger.next();
        // }, (error) => {
        //     console.log(error);
        // });


    }
}
