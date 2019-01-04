import { Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { MovementsCategoriesService } from '../services/movements-categories.service';
MovementsCategoriesService

@Component({
  selector: 'app-new-movement-category',
  templateUrl: './new-movement-category.component.html',
  styleUrls: ['./new-movement-category.component.css']
})
export class NewMovementCategoryComponent {

  movementForm: FormGroup;
  isLoading = false;

  constructor(private movCategoryService:MovementsCategoriesService, private routes:Router) { 
    this.movementForm = new FormGroup({
      'new_mov_category': new FormControl('', Validators.required)
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
    
    this.movCategoryService.create(this.movementForm.value).subscribe(
      (response) => { 
        console.log(response)
        this.routes.navigate(['movements-categories']) },
      (error) => { console.log(error) }
    );
  }
  

}
