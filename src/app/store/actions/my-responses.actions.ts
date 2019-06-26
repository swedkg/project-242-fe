import { Action } from '@ngrx/store';
import { Message } from '../../models/message.model';

// load messages
export const LOAD_MY_RESPONSES = '[My Responses] Load Messages';
export const LOAD_MY_RESPONSES_FAIL = '[My Responses] Load Messages Fail';
export const LOAD_MY_RESPONSES_SUCCESS = '[My Responses] Load Messages Success';

export class LoadMyResponses implements Action {
  readonly type = LOAD_MY_RESPONSES;
  constructor(public payload?: any) {}
}

export class LoadMyResponsesFail implements Action {
  readonly type = LOAD_MY_RESPONSES_FAIL;
  constructor(public payload: any) {}
}

export class LoadMyResponsesSuccess implements Action {
  readonly type = LOAD_MY_RESPONSES_SUCCESS;
  constructor(public payload: Message[]) {}
}

// action types
export type MyResponsesAction =
  | LoadMyResponses
  | LoadMyResponsesFail
  | LoadMyResponsesSuccess;
