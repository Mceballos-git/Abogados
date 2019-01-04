import { TestBed } from '@angular/core/testing';

import { MovementsCategoriesService } from './movements-categories.service';

describe('MovementsCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovementsCategoriesService = TestBed.get(MovementsCategoriesService);
    expect(service).toBeTruthy();
  });
});
