import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { catchError, map, switchMap } from "rxjs/operators";
import { HelpRequestsService } from "../../_services/help-requests.service";
import { SnackbarService } from "../../_services/snackbar.service";
import * as requestsActions from "../actions/requests.action";
import { Store } from "@ngrx/store";
import * as fromStore from "../../store";
import { UserService } from "../../_services/user.service";

@Injectable()
export class RequestsEffects {
  constructor(
    private actions$: Actions,
    private requestsService: HelpRequestsService,
    private SnackbarService: SnackbarService,
    private store: Store<fromStore.PlatformState>,
    private UserService: UserService
  ) {}
  @Effect()
  loadRequests$ = this.actions$.pipe(
    ofType(requestsActions.LOAD_REQUESTS),
    switchMap(() => {
      return this.requestsService.getAllRequests().pipe(
        map((requests) => new requestsActions.LoadRequestsSuccess(requests)),
        catchError((error) => of(new requestsActions.LoadRequestsFail(error)))
      );
    })
  );

  @Effect()
  createRequest$ = this.actions$.pipe(
    ofType<requestsActions.CreateRequest>(requestsActions.CREATE_REQUEST),
    // map((action: requestsActions.CreateRequest)=> action.payload),
    switchMap((action) => {
      let request = action.payload;
      return this.requestsService.createRequest(request).pipe(
        map((request) => new requestsActions.CreateRequestSuccess(request)),
        catchError((error) => of(new requestsActions.CreateRequestFail(error)))
      );
    })
  );

  @Effect()
  createWebSocketRequest$ = this.actions$.pipe(
    ofType<requestsActions.CreateWebSocketRequest>(
      requestsActions.CREATE_WB_REQUEST
    ),
    map((action) => {
      let request = action.payload;
      return new requestsActions.CreateWebSocketRequestSuccess(request);
    })
  );

  @Effect({ dispatch: false })
  handleRequestRepublished$ = this.actions$.pipe(
    ofType<requestsActions.RequestRepublished>(
      requestsActions.REQUEST_REPUBLISHED
    ),
    map((action) => {
      console.log(action.payload);

      this.store
        .select(fromStore.getSingleRequest, action.payload)
        .subscribe((data) => {
          let request = data[0];
          let user = this.UserService.currentUserDetails;
          if (request.owner_id == user.id)
            this.SnackbarService.show("Your request was republished");
        });
    })
  );
}
