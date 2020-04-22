import * as fromMessages from "../actions/messages.actions";
import { Message } from "../../_models/message.model";

export interface MessageState {
  // data: Message[];
  entities: { [id: number]: Message };
  loaded: boolean;
  loading: boolean;
}

export const initialState: MessageState = {
  // data: [],
  entities: {},
  loaded: false,
  loading: false,
};

export function reducer(
  state = initialState,
  action: fromMessages.MyMessagesAction
): MessageState {
  switch (action.type) {
    case fromMessages.LOAD_MESSAGES: {
      console.log(state);

      return {
        ...state,
        loading: true,
      };
    }

    case fromMessages.LOAD_MESSAGES_SUCCESS: {
      // console.log(action);
      let messages = action.payload;
      // console.log(messages);

      // let entities = messages.reduce(
      //   (entities: { [id: number]: Message }, message) => {
      //     return {
      //       ...entities,
      //       [message.id]: message
      //     };
      //   },
      //   {
      //     ...state.entities
      //   }
      // );

      let entities = messages.reduce(
        (entities: { [id: number]: Message }, message) => {
          entities[message.id] = message;
          return entities;
        },
        {}
      );

      // console.log(messages, state, entities, {
      //   entities,
      //   loading: false,
      //   loaded: true
      // });

      return {
        entities,
        loading: false,
        loaded: true,
        // entities
      };
    }

    case fromMessages.LOAD_MESSAGES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromMessages.CREATE_MESSAGE_SUCCESS: {
      let message = action.payload.body;
      // console.log(action, message);

      const entities = {
        ...state.entities,
        [message.id]: message,
      };

      let kk = {
        ...state,
        entities,
      };

      // console.log(state, entities, kk);

      return {
        ...state,
        entities,
      };
    }

    case fromMessages.CREATE_WB_MESSAGE_SUCCESS: {
      let message = action.payload;
      const entities = {
        ...state.entities,
        [message.id]: message,
      };

      return {
        ...state,
        entities,
      };
    }

    case fromMessages.REMOVE_ALL_MESSAGES: {
      return initialState;
    }

    case fromMessages.REMOVE_RESPONDERS_MESSAGES: {
      let fulfillment = action.payload;
      let entities = state.entities;
      const filterObject = (obj, filter, filterValue) =>
        Object.keys(obj).reduce(
          (acc, val) =>
            obj[val][filter] === filterValue
              ? acc
              : {
                  ...acc,
                  [val]: obj[val],
                },
          {}
        );

      entities = filterObject(entities, "fullfilment_id", fulfillment);

      console.log(fulfillment, state, entities);

      return {
        ...state,
        entities,
      };
    }
  }
  // console.log(action, state);
  return state;
}

export const getMessages = (state: MessageState) => state.entities;
export const getMessagesLoading = (state: MessageState) => state.loading;
export const getMessagesLoaded = (state: MessageState) => state.loaded;
