import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { ActivatedRoute } from '@angular/router';


class Client{
  
  active : number
  first_name : string
  last_name : string
  nationality : string
  identification_type:string
  identification_number:string
  tin_number:string
  date_of_birth:string
  phone_number:string
  email : string  
  street_address: string
  number_address: string
  floor_address: string
  coutry: string
  state: string
  city: string
  observations: string
}


@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent {  
 
  client:Client;
  clientForm: FormGroup;
  isLoading = false;
  id_types = ['DNI', 'DU', 'LM', 'LC', 'LE', 'LF', 'DE', 'CI', 'FM', 'FL'];
  id_client;

  constructor(private clientService:ClientsService, 
    private activatedRoute:ActivatedRoute) {

    this.id_client= this.activatedRoute.snapshot.paramMap.get('id');
    this.getClient(this.id_client);
    

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

  getClient(id){
    this.clientService.getOne(id).subscribe((response:any)=>{      
      this.client = response;
      this.clientForm.patchValue(this.client);             
      console.log(this.client);     
      
    },(error)=>{
      console.log(error);      
    })
  }

  editClient(){
    this.isLoading=true;
    this.clientService.updateUser(this.id_client, this.clientForm.value).subscribe((response) => {
        this.isLoading=false;
        this.clientForm.reset();
        console.log('Update client successfuly. Todo: Mostrar mensaje update exitoso');

      }, (error) => {
          this.isLoading=false;
          console.log('There was an error while trying to update client. Todo: Mostrar mensaje update no exitoso' + error);
  
      });

  }

}
