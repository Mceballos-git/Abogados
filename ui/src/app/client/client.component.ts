import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ClientsService } from '../services/clients.service';


import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  loaded: boolean;
  itemToDeleteData : any;

  constructor(private http: HttpClient, private clientService: ClientsService) {
    this.loaded = false
   }

  ngOnInit():void {
    this.clientService.getClientsList().subscribe(response => {
    this.clients = response;
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
    this.clientService.delete(this.itemToDeleteData.id).subscribe((response) => {
      this.handleDeletingSuccess(this.itemToDeleteData)
    },(error) => { this.handleDeletingError(error)});

  }

  handleDeletingSuccess(deletedItem) {

    console.log(deletedItem);

    this.clients.splice(deletedItem.index, 1);
    console.log('Delete client successfuly. Todo: Mostrar mensaje delete exitoso');      
  }

  handleDeletingError(response) {
    console.log('There was an error while trying to delete client. Todo: Mostrar mensaje delete no exitoso');
  }  

}
