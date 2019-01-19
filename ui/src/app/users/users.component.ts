import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../services/users.service';


import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  
  users: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loaded: boolean;
  itemToDeleteData : any;

  constructor(private http: HttpClient, private userService: UsersService) {
    this.loaded = false;
   }

  ngOnInit():void {
    this.userService.getUsersList().subscribe(response => {
    this.users = response;
    console.log(response);    
    this.buildDtOptions(response)
    this.loaded = true;
    this.dtTrigger.next();
    }, (error)=>{
      console.log(error);      
    });
  }

  private buildDtOptions(data: any): void {
    this.dtOptions = {
        language: {
            processing: 'Procesando...',
            lengthMenu: "Mostrar _MENU_ registros",
            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            search: "Buscar:",
            url: "",
            thousands: ",",
            loadingRecords: "Cargando...",
            paginate: {
                first: "Primero",
                last: "Último",
                next: "Siguiente",
                previous: "Anterior"
            },
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        },
        pagingType: 'full_numbers',
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
  setItemToDelete(index, id) {
    this.itemToDeleteData = {
        id: id,
        index: index
    };
  }

  delete() {
    this.userService.delete(this.itemToDeleteData.id).subscribe((response) => {
      this.handleDeletingSuccess(this.itemToDeleteData)
    },(error) => { this.handleDeletingError(error)});

  }

  handleDeletingSuccess(deletedItem) {

    console.log(deletedItem);

    this.users.splice(deletedItem.index, 1);
    console.log('Delete user successfuly. Todo: Mostrar mensaje delete exitoso');      
  }

  handleDeletingError(response) {
    console.log('There was an error while trying to delete user. Todo: Mostrar mensaje delete no exitoso');
  }  
}
