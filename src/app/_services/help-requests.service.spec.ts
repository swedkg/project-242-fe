import { TestBed } from '@angular/core/testing';

import { HelpRequestsService } from './help-requests.service';

describe('HelpRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HelpRequestsService = TestBed.get(HelpRequestsService);
    expect(service).toBeTruthy();
  });
});
