import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMessages from '../reducers/messages.reducer';

export const getMessagesState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.messages
);

// getMessagesEntities
export const getMessagesEntities = createSelector(
  getMessagesState,
  fromMessages.getMessages
);

export const getAllMessages = createSelector(
  getMessagesEntities,
  entitites => {
    // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

    return Object.keys(entitites).map(id => entitites[id]);
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
