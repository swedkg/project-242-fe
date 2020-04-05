import { Action } from "@ngrx/store";
import { Message } from "../../_models/message.model";

// load messages
export const LOAD_MESSAGES = "[Messages] Load Messages";
export const LOAD_MESSAGES_FAIL = "[Messages] Load Messages Fail";
export const LOAD_MESSAGES_SUCCESS = "[Messages] Load Messages Success";

export class LoadMessages implements Action {
  readonly type = LOAD_MESSAGES;
  constructor(public payload?: any) {}
}

export class LoadMessagesFail implements Action {
  readonly type = LOAD_MESSAGES_FAIL;
  constructor(public payload: any) {}
}

export class LoadMessagesSuccess implements Action {
  readonly type = LOAD_MESSAGES_SUCCESS;
  constructor(public payload: Message[]) {}
}

// create message from API
export const CREATE_MESSAGE = "[Messages] Create Message";
export const CREATE_MESSAGE_FAIL = "[Messages] Create Message Fail";
export const CREATE_MESSAGE_SUCCESS = "[Messages] Create Message Success";

export class CreateMessage implements Action {
  readonly type = CREATE_MESSAGE;
  constructor(public payload: any) {}
}

export class CreateMessageFail implements Action {
  readonly type = CREATE_MESSAGE_FAIL;
  constructor(public payload: any) {}
}

export class CreateMessageSuccess implements Action {
  readonly type = CREATE_MESSAGE_SUCCESS;
  constructor(public payload: any) {}
}

// create message from websocket
export const CREATE_WB_MESSAGE = "[Messages] Create WB Message";
export const CREATE_WB_MESSAGE_FAIL = "[Messages] Create WB Message Fail";
export const CREATE_WB_MESSAGE_SUCCESS = "[Messages] Create WB Message Success";

export class CreateWebSocketMessage implements Action {
  readonly type = CREATE_WB_MESSAGE;
  constructor(public payload: any) {}
}

export class CreateWebSocketMessageFail implements Action {
  readonly type = CREATE_WB_MESSAGE_FAIL;
  constructor(public payload: any) {}
}

export class CreateWebSocketMessageSuccess implements Action {
  readonly type = CREATE_WB_MESSAGE_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type MyMessagesAction =
  | LoadMessages
  | LoadMessagesFail
  | LoadMessagesSuccess
  | CreateMessage
  | CreateMessageFail
  | CreateMessageSuccess
  | CreateWebSocketMessage
  | CreateWebSocketMessageFail
  | CreateWebSocketMessageSuccess;
