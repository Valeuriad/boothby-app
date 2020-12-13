import { TestBed } from '@angular/core/testing';

import { DialogLineService } from './dialog-line.service';

describe('DialogLineService', () => {
  let service: DialogLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
