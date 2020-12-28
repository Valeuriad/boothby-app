import { TestBed } from '@angular/core/testing';

import { DialogLineTransitionService } from './dialog-line-transition.service';

describe('DialogLineTransitionService', () => {
  let service: DialogLineTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLineTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
