import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientsService } from '../services/clients.service';



@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {


 
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

    this.clientForm.patchValue({active:true});
  }

  ngOnInit() {
  }

  createClient(){
    this.isLoading=true;
    this.clientService.create(this.clientForm.value).subscribe((response) => {
        this.isLoading=false;
        this.clientForm.reset();
        console.log('Create client successfuly. Todo: Mostrar mensaje create exitoso');

    }, (error) => {
        this.isLoading=false;
        console.log('There was an error while trying to create client. Todo: Mostrar mensaje create no exitoso' + error);

    });
  }

}
