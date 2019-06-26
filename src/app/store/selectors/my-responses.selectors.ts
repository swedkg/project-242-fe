import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMyResponses from '../reducers/my-responses.reducer';

export const getMyResponsesState = createSelector(
  fromFeature.getPlatformState,
  (state: fromFeature.PlatformState) => state.myResponses
);

// getMyResponsesEntities
export const getMyResponsesEntities = createSelector(
  getMyResponsesState,
  fromMyResponses.getMyResponses
);

export const getMyResponses = createSelector(
  getMyResponsesEntities,
  entitites => {
    // return Object.keys(entitites).map(id => entitites[parseInt(id, 10)]);

    return Object.keys(entitites).map(id => entitites[id]);
  }
);

export const getMyResponsesLoaded = createSelector(
  getMyResponsesState,
  fromMyResponses.getMyResponsesLoaded
);

export const getMyResponsesLoading = createSelector(
  getMyResponsesState,
  fromMyResponses.getMyResponsesLoading
);
