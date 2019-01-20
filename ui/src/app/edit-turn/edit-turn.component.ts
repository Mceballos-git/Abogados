import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TurnsService } from '../services/turns.service';

class Turns{
  client_id:number
  given_user_id:number
  attention_user_id:number
  office_id:number
  register_date: Date
  turn_date: Date
  turn_time_start: Date
  turn_time_end: Date
  phone_number_ref: number
  priority: string
  comments: string
  title: string
  active: number
}

@Component({
  selector: 'app-edit-turn',
  templateUrl: './edit-turn.component.html',
  styleUrls: ['./edit-turn.component.css']
})
export class EditTurnComponent implements OnInit {

  turn:Turns;
  turnForm:FormGroup;
  isLoading = false;
  id_turn;

  constructor(private turnService:TurnsService, private activatedRoute:ActivatedRoute) {

    this.id_turn= this.activatedRoute.snapshot.paramMap.get('id');
    this.getTurn(this.id_turn);

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

  getTurn(id){
    this.turnService.getOne(id).subscribe((response:any)=>{      
      this.turn = response;
      this.turnForm.patchValue(this.turn);             
      console.log(this.turn);     
      
    },(error)=>{
      console.log(error);      
    })
  }

  editTurn(){
  this.isLoading=true;
  this.turnService.updateTurn(this.id_turn, this.turnForm.value).subscribe((response) => {
      this.isLoading=false;
      this.turnForm.reset();
      console.log('Update turn successfuly. Todo: Mostrar mensaje update exitoso');

    }, (error) => {
        this.isLoading=false;
        console.log('There was an error while trying to update turn. Todo: Mostrar mensaje update no exitoso' + error);

    });

  }

}
