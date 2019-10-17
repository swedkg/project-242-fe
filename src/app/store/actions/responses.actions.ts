import { Action } from '@ngrx/store';
import { Message } from '../../models/message.model';

// load messages
export const LOAD_RESPONSES = '[My Responses] Load Messages';
export const LOAD_RESPONSES_FAIL = '[My Responses] Load Messages Fail';
export const LOAD_RESPONSES_SUCCESS = '[My Responses] Load Messages Success';

export class LoadResponses implements Action {
  readonly type = LOAD_RESPONSES;
  constructor(public payload?: any) {}
}

export class LoadResponsesFail implements Action {
  readonly type = LOAD_RESPONSES_FAIL;
  constructor(public payload: any) {}
}

export class LoadResponsesSuccess implements Action {
  readonly type = LOAD_RESPONSES_SUCCESS;
  constructor(public payload: Message[]) {}
}

// action types
export type MyResponsesAction =
  | LoadResponses
  | LoadResponsesFail
  | LoadResponsesSuccess;
