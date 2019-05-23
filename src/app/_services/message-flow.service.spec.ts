import { TestBed } from '@angular/core/testing';

import { MessageFlowService } from './message-flow.service';

describe('MessageFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageFlowService = TestBed.get(MessageFlowService);
    expect(service).toBeTruthy();
  });
});
