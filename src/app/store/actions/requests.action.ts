import { Action } from "@ngrx/store";
import { AidRequest } from "../../_models/aidRequest.model";

// load requests
export const LOAD_REQUESTS = "[Requests] Load Requests";
export const LOAD_REQUESTS_FAIL = "[Requests] Load Requests Fail";
export const LOAD_REQUESTS_SUCCESS = "[Requests] Load Requests Success";

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

// create request
export const CREATE_REQUEST = "[Requests] Create Request";
export const CREATE_REQUEST_FAIL = "[Requests] Create Request Fail";
export const CREATE_REQUEST_SUCCESS = "[Requests] Create Request Success";

export class CreateRequest implements Action {
  readonly type = CREATE_REQUEST;
  constructor(public payload: AidRequest) {}
}

export class CreateRequestFail implements Action {
  readonly type = CREATE_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class CreateRequestSuccess implements Action {
  readonly type = CREATE_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type RequestsAction =
  | LoadRequests
  | LoadRequestsFail
  | LoadRequestsSuccess
  | CreateRequest
  | CreateRequestFail
  | CreateRequestSuccess;
