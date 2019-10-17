import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromResponses from '../reducers/responses.reducer';

export const getResponsesState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.responses
);

// getResponsesEntities
export const getResponsesEntities = createSelector(
  getResponsesState,
  fromResponses.getResponses
);

export const getResponses = createSelector(
  getResponsesEntities,
  entitites => {
    // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

    return Object.keys(entitites).map(id => entitites[id]);
  }
);

export const getResponsesLoaded = createSelector(
  getResponsesState,
  fromResponses.getResponsesLoaded
);

export const getResponsesLoading = createSelector(
  getResponsesState,
  fromResponses.getResponsesLoading
);
