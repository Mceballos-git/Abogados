import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MovementsService} from '../services/movements.service';

import {Subject} from 'rxjs';
import 'rxjs/add/operator/map';

class Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

@Component({
    selector: 'app-cash-items',
    templateUrl: './cash-items.component.html',
    styleUrls: ['./cash-items.component.css']
})
export class CashItemsComponent implements OnInit {

    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject();
    loaded: boolean;

    constructor(private http: HttpClient, private movService: MovementsService) {
        this.loaded = false
    }

    ngOnInit(): void {
        this.movService.getMovementsCategoriesList().subscribe(response => {
            this.buildDtOptions(response)
            this.loaded = true;
            this.dtTrigger.next();
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
            data: data,
            columns: [
                {title: 'ID', data: 'id'},
                {title: 'Nombre', data: 'name'},
            ]
        };
    }


    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }
}


