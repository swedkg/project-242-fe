import { Action } from '@ngrx/store';
import { Message } from '../../models/message.model';

// load messages
export const LOAD_MESSAGES = '[Messages] Load Messages';
export const LOAD_MESSAGES_FAIL = '[Messages] Load Messages Fail';
export const LOAD_MESSAGES_SUCCESS = '[Messages] Load Messages Success';

export class LoadMessages implements Action {
  readonly type = LOAD_MESSAGES;
}

export class LoadMessagesFail implements Action {
  readonly type = LOAD_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export class LoadMessagesSuccess implements Action {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor(public payload: Message[]) {}
}

// action types
export type MessagesAction =
  | LoadMessages
  | LoadMessagesFail
  | LoadMessagesSuccess;
