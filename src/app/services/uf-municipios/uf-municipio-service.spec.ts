import { TestBed } from '@angular/core/testing';

import { UfMunicipioService } from './uf-municipio-service';

describe('UfMunicipioService', () => {
  let service: UfMunicipioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UfMunicipioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
