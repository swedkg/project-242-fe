import { createSelector } from "@ngrx/store";
import * as fromFeature from "../reducers";
import * as fromMessages from "../reducers/messages.reducer";

export const getMessagesState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.messages
);

// getMessagesEntities
export const getMessagesEntities = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

export const getMessages = createSelector(getMessagesEntities, (entitites) => {
  // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

  let result = Object.keys(entitites).map((id) => entitites[id]);

  return result;
});

export const getChatMessages = createSelector(
  getMessagesEntities,
  (entitites, fullfilment_id) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[id])
      .filter((m) => {
        return m.fullfilment_id == fullfilment_id;
      });

    // console.log(result);

    return result;
  }
);

export const getChatForResponder = createSelector(
  getMessagesEntities,
  (entitites, obj) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[id])
      .filter((m) => {
        return (
          m.request_id == obj.request_id &&
          (m.receiver_id == obj.responder_id || m.sender_id == obj.responder_id)
        );
      });

    return result;
  }
);

export const getAllNotifications = createSelector(
  getMessagesEntities,
  (entitites, userId) => {
    let result = Object.keys(entitites)
      .map((id) => entitites[id])
      .filter((m) => {
        return m.receiver_id == userId && (m.status === 0 || m.status === 1);
      });
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
