import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-cash-items',
  templateUrl: './cash-items.component.html',
  styleUrls: ['./cash-items.component.css']
})
export class CashItemsComponent {


}
