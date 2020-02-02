import { TestBed } from "@angular/core/testing";

import { MessageFlowService } from "./message-flow.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';

describe("MessageFlowService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("aidPlatform", reducers)
      ]
    }).compileComponents()
  );

  it("should be created", () => {
    const service: MessageFlowService = TestBed.get(MessageFlowService);
    expect(service).toBeTruthy();
  });
});
