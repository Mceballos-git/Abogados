import { Component } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { MovementsCategoriesService } from '../services/movements-categories.service';

@Component({
  selector: 'app-edit-movement-category',
  templateUrl: './edit-movement-category.component.html',
  styleUrls: ['./edit-movement-category.component.css']
})
export class EditMovementCategoryComponent {

  movementForm: FormGroup;
  isLoading = false;
  id_mov_category;


  constructor(private movCategoryService:MovementsCategoriesService, 
    private routes:Router,
    private activatedRoute:ActivatedRoute) { 
    this.movementForm = new FormGroup({      
      'name_mov_category': new FormControl(this.activatedRoute.snapshot.paramMap.get('name'), Validators.required)
    });

    this.id_mov_category=this.activatedRoute.snapshot.paramMap.get('id');

    
  }

  editMovementCategory(){
    this.isLoading = true;
    
    if (!this.movementForm.valid) {
        this.isLoading = false;
        return false;
    }

    // Do send mail Request
    console.log(this.movementForm.value);
    
    this.movCategoryService.edit(this.movementForm.value, this.id_mov_category).subscribe(
      (response) => {
         console.log(response) 
         //poner mensaje de ok
        this.routes.navigate(['movements-categories'])},
      (error) => { 
        //poner mensaje de error
        console.log(error) }
    );
  }
}
