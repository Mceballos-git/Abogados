import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { TurnsService } from '../services/turns.service';


@Component({
  selector: 'app-new-turn',
  templateUrl: './new-turn.component.html',
  styleUrls: ['./new-turn.component.css']
})
export class NewTurnComponent implements OnInit {

  turnForm:FormGroup;
  isLoading = false;
  priority = ['NORMAL', 'IMPORTANTE', 'PRIORITARIA', 'BASICA'];

  constructor(private turnService:TurnsService) {
    this.turnForm = new FormGroup({
      'active': new FormControl(),     
      'client_id': new FormControl('', Validators.required),
      'given_user_id': new FormControl('', Validators.required),
      'attention_user_id': new FormControl('', Validators.required),
      'office_id': new FormControl('', Validators.required),
      'register_date': new FormControl('', Validators.required),
      'turn_date': new FormControl(''),
      'turn_time_start': new FormControl('', Validators.required),
      'turn_time_end': new FormControl('', Validators.required),
      'phone_number_ref':new FormControl('', Validators.required),      
      'priority': new FormControl(),
      'comments': new FormControl(''),
      'title':new FormControl('')      
    }); 
   }

  ngOnInit() {
  }

  createTurn(){
    this.isLoading=true;
    this.turnService.create(this.turnForm.value).subscribe((response) => {
        this.isLoading=false;
        this.turnForm.reset();
        console.log('Create turn successfuly. Todo: Mostrar mensaje create exitoso');

    }, (error) => {
        this.isLoading=false;
        console.log('There was an error while trying to create turn. Todo: Mostrar mensaje create no exitoso' + error);

    });
  }

}
