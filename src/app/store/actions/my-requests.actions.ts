import { Action } from '@ngrx/store';
import { Message } from '../../models/message.model';

// load messages
export const LOAD_MY_REQUESTS = '[My Requests] Load Messages';
export const LOAD_MY_REQUESTS_FAIL = '[My Requests] Load Messages Fail';
export const LOAD_MY_REQUESTS_SUCCESS = '[My Requests] Load Messages Success';

export class LoadMyRequests implements Action {
  readonly type = LOAD_MY_REQUESTS;
  constructor(public payload?: any) {}
}

export class LoadMyRequestsFail implements Action {
  readonly type = LOAD_MY_REQUESTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadMyRequestsSuccess implements Action {
  readonly type = LOAD_MY_REQUESTS_SUCCESS;
  constructor(public payload: Message[]) {}
}

// action types
export type MyRequestsAction =
  | LoadMyRequests
  | LoadMyRequestsFail
  | LoadMyRequestsSuccess;
