import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MovementsService } from '../services/movements.service';


class Categories {
  id: number;
  name: string;
 }

@Component({
  selector: 'app-cash-items',
  templateUrl: './cash-items.component.html',
  styleUrls: ['./cash-items.component.css']
})
export class CashItemsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  items: Categories[];

  constructor(private http: HttpClient, private movService:MovementsService) { }

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.movService.getMovementsCategoriesList()          
          .subscribe((resp:any) => {
            that.items = resp;
            console.log(resp);
            
            callback({
              recordsTotal: resp.length,
              recordsFiltered: resp.length,
              data: []
            });
          });
      },
      columns: [{ data: 'id' }, { data: 'name' }]
    };
  }
}


