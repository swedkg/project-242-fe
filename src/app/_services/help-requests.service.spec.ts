import { TestBed } from "@angular/core/testing";

import { HelpRequestsService } from "./help-requests.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StoreModule } from "@ngrx/store";
import { reducers } from "../store";

describe("HelpRequestsService", () => {
  beforeEach(
    () =>
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forRoot({}),
          StoreModule.forFeature("aidPlatform", reducers)
        ]
      }).compileComponents
  );

  it("should be created", () => {
    const service: HelpRequestsService = TestBed.get(HelpRequestsService);
    expect(service).toBeTruthy();
  });
});
