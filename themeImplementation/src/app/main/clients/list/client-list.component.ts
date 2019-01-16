import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ClientsService } from 'app/main/services/clients.service';

import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
    selector: 'client-list',
    styleUrls: ['./client-list.component.scss'],
    templateUrl: './client-list.component.html',
})

export class ClientListComponent implements OnInit {

    displayedColumns: string[] = ['last_name', 'first_name', 'identification_number', 'city', 'email', 'actions'];
    clients: any;
    dataSource: MatTableDataSource<any>;
    loaded: boolean;
    dtTrigger: Subject<any> = new Subject();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _clientsService: ClientsService) {
        this.loaded = false;
    }

    ngOnInit() {

        this._clientsService.getClientsList().subscribe(response => {
            this.clients = response;
            this.loaded = true;

            // Assign the data to the data source for the table to render
            this.dataSource = new MatTableDataSource(this.clients);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

            this.dtTrigger.next();
        }, (error) => {
            console.log(error);
        });


    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    delete(id){
        this._clientsService.delete(id).subscribe((response) => {
            console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');  
          },(error) => { 
            console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
        });   
    }


}
