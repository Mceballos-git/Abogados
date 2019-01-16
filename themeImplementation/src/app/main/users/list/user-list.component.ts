import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UsersService} from "../../services/users.service";
import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';


export interface UserData {
    id: string;
    name: string;
    progress: string;
    color: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
    selector: 'user-list',
    styleUrls: ['user-list.component.scss'],
    templateUrl: 'user-list.component.html',
})

export class UserListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'username', 'first_name', 'last_name', 'active', 'actions'];
    users : any;
    dataSource: MatTableDataSource<UserData>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _usersService : UsersService) {
        this.loaded = false;
    }

    ngOnInit() {

        this._usersService.getUsersList().subscribe(response => {
            this.users = response;
            this.loaded = true;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.dtTrigger.next();
        }, (error)=>{
            console.log(error);
        });




    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }



}
