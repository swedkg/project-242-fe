import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

import { Globals } from '../../../assets/globals';

export const getMessagesState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.messages
);

// getMessagesEntities
export const getMessagesEntities = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

export const getMessages = createSelector(
  getMessagesEntities,
  entitites => {
    // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

    let result = Object.keys(entitites).map(id => entitites[id]);

    console.log('all messages', result);

    return result;
  }
);

export const getChatMessages = createSelector(
  getMessagesEntities,
  (entitites, request_id) => {
    let result = Object.keys(entitites)
      .map(id => entitites[id])
      .filter(m => {
        return m.request_id == request_id;
      });

    // console.log('--------------->', entitites, request_id, result);

    return result;
  }
);

export const getChatForResponder = createSelector(
  getMessagesEntities,
  (entitites, obj) => {
    let result = Object.keys(entitites)
      .map(id => entitites[id])
      .filter(m => {
        return (
          m.request_id == obj.request_id &&
          (m.receiver_id == obj.responder_id || m.sender_id == obj.responder_id)
        );
      });

    // console.log(entitites, obj, '--------------->', result);

    return result;
  }
);

export const getMessagesLoaded = createSelector(
  getMessagesState,
  fromMessages.getMessagesLoaded
);

export const getMessagesLoading = createSelector(
  getMessagesState,
  fromMessages.getMessagesLoading
);
