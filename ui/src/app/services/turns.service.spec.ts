import { TestBed } from '@angular/core/testing';

import { TurnsService } from './turns.service';

describe('TurnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurnsService = TestBed.get(TurnsService);
    expect(service).toBeTruthy();
  });
});
