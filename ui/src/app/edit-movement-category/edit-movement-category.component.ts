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



  constructor(private movCategoryService:MovementsCategoriesService, 
    private routes:Router,
    private activatedRoute:ActivatedRoute) { 
    this.movementForm = new FormGroup({
      'edit_mov_category': new FormControl(this.activatedRoute.snapshot.paramMap.get('id'), Validators.required)
    });
  }

  newMovementCategory(){
    this.isLoading = true;
    
    if (!this.movementForm.valid) {
        this.isLoading = false;
        return false;
    }

    // Do send mail Request
    console.log(this.movementForm.value);
    
    this.movCategoryService.edit(this.movementForm.value).subscribe(
      (response) => {
         console.log(response) 
        this.routes.navigate(['movements-categories'])},
      (error) => { console.log(error) }
    );
  }
}
