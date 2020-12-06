import { TestBed } from '@angular/core/testing';

import { WorkspaceSlackService } from './workspace-slack.service';

describe('WorkspaceSlackService', () => {
  let service: WorkspaceSlackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceSlackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
