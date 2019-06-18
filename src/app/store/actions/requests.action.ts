import { Action } from '@ngrx/store';
import { AidRequest } from '../../models/aidRequest.model';

// load requests
export const LOAD_REQUESTS = '[Requests] Load Requests';
export const LOAD_REQUESTS_FAIL = '[Requests] Load Requests Fail';
export const LOAD_REQUESTS_SUCCESS = '[Requests] Load Requests Success';

export class LoadRequests implements Action {
  readonly type = LOAD_REQUESTS;
}

export class LoadRequestsFail implements Action {
  readonly type = LOAD_REQUESTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadRequestsSuccess implements Action {
  readonly type = LOAD_REQUESTS_SUCCESS;
  constructor(public payload: AidRequest[]) {}
}

// action types
export type RequestsAction =
  | LoadRequests
  | LoadRequestsFail
  | LoadRequestsSuccess;
