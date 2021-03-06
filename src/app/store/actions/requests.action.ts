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

// create request from websocket
export const CREATE_WB_REQUEST = "[Requests] Create WB Request";
export const CREATE_WB_REQUEST_FAIL = "[Requests] Create WB Request Fail";
export const CREATE_WB_REQUEST_SUCCESS = "[Requests] Create WB Request Success";

export class CreateWebSocketRequest implements Action {
  readonly type = CREATE_WB_REQUEST;
  constructor(public payload: AidRequest) {}
}

export class CreateWebSocketRequestFail implements Action {
  readonly type = CREATE_WB_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class CreateWebSocketRequestSuccess implements Action {
  readonly type = CREATE_WB_REQUEST_SUCCESS;
  constructor(public payload: any) {}
}

// logout
export const REMOVE_ALL_REQUESTS = "[Requests] Remove all requests";

export class RemoveAllRequests implements Action {
  readonly type = REMOVE_ALL_REQUESTS;
  constructor() {}
}

// mark request as fulfilled
export const REQUEST_FULFILLED = "[Requests] Request was fulfilled";

export class RequestFulfilled implements Action {
  readonly type = REQUEST_FULFILLED;
  constructor(public payload: number) {}
}

// mark request as republished
export const REQUEST_REPUBLISHED = "[Requests] Request was republished";

export class RequestRepublished implements Action {
  readonly type = REQUEST_REPUBLISHED;
  constructor(public payload: number) {}
}

// action types
export type RequestsAction =
  | LoadRequests
  | LoadRequestsFail
  | LoadRequestsSuccess
  | CreateRequest
  | CreateRequestFail
  | CreateRequestSuccess
  | CreateWebSocketRequest
  | CreateWebSocketRequestFail
  | CreateWebSocketRequestSuccess
  | RemoveAllRequests
  | RequestFulfilled
  | RequestRepublished;
