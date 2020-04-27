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

// logout
export const REMOVE_ALL_MESSAGES = "[Messages] Remove all messages";

export class RemoveAllMessages implements Action {
  readonly type = REMOVE_ALL_MESSAGES;
  constructor() {}
}

// clean messages after a responder was removed
export const REMOVE_RESPONDERS_MESSAGES =
  "[Messages] Remove responder's messages";

export class RemoveRespodersMessages implements Action {
  readonly type = REMOVE_RESPONDERS_MESSAGES;
  constructor(public payload: number) {}
}

// mark message as delivered
export const MESSAGE_DELIVERED = "[Messages] Message was delivered";

export class MessageDelivered implements Action {
  readonly type = MESSAGE_DELIVERED;
  constructor(public payload: number) {}
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
  | CreateWebSocketMessageSuccess
  | RemoveAllMessages
  | RemoveRespodersMessages
  | MessageDelivered;
