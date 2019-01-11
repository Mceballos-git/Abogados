import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientsService } from '../services/clients.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {
  public minDate = new Date(1900, 1, 1, 0, 0);
  
  public maxDate = new Date(2500, 12, 31, 0, 0);
 
  clientForm: FormGroup;
  isLoading = false;
  id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];

  constructor(private clientService:ClientsService) {
    this.clientForm = new FormGroup({
      'active': new FormControl(),     
      'first_name': new FormControl('', Validators.required),
      'last_name': new FormControl('', Validators.required),
      'nationality': new FormControl('', Validators.required),
      'identification_type': new FormControl('', Validators.required),
      'identification_number': new FormControl('', Validators.required),
      'tin_number': new FormControl(''),
      'date_of_birth': new FormControl('', Validators.required),
      'phone_number': new FormControl('', Validators.required),
      'email': new FormControl('',Validators.pattern("^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.(([0-9]{1,3})|([a-zA-Z]{2,3})|(aero|coop|info|museum|name))$")),
      'street_address':new FormControl('', Validators.required),
      'number_address': new FormControl('', Validators.required),
      'floor_address': new FormControl(''),
      'department_address':new FormControl(''),
      'country': new FormControl('', Validators.required),
      'state':new FormControl(''), 
      'city':new FormControl(''),
      'observations': new FormControl(''),
    }); 
  }

}
