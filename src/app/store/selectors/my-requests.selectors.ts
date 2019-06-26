import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMyRequests from '../reducers/my-requests.reducer';

export const getMyRequestsState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.myRequests
);

// getMessagesEntities
export const getMyRequestsEntities = createSelector(
  getMyRequestsState,
  fromMyRequests.getMyRequests
);

export const getMyRequests = createSelector(
  getMyRequestsEntities,
  entitites => {
    // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

    return Object.keys(entitites).map(id => entitites[id]);
  }
);

export const getMyRequestsLoaded = createSelector(
  getMyRequestsState,
  fromMyRequests.getMyRequestsLoaded
);

export const getMyRequestsLoading = createSelector(
  getMyRequestsState,
  fromMyRequests.getMyRequestsLoading
);
