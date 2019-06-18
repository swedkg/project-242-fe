import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRequests from '../reducers/requests.reducer';

export const getRequestsState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.requests
);

export const getRequestsEntities = createSelector(
  getRequestsState,
  fromRequests.getRequestsEntities
);

export const getAllRequests = createSelector(
  getRequestsEntities,
  entitites => {
    return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);
  }
);

export const getRequestsLoaded = createSelector(
  getRequestsState,
  fromRequests.getRequestsLoaded
);

export const getRequestsLoading = createSelector(
  getRequestsState,
  fromRequests.getRequestsLoading
);
