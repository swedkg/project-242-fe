import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRequests from './requests.reducer';
import * as fromResponses from './responses.reducer';

// define the structure of the state tree
export interface PlatformState {
  requests: fromRequests.RequestState; // referencing the interface
  responses: fromResponses.MessageState;
}

// register our reducers
export const reducers: ActionReducerMap<PlatformState> = {
  requests: fromRequests.reducer,
  responses: fromResponses.reducer
};

export const getPlatformState = createFeatureSelector<PlatformState>(
  'addPlatform'
);

// requests state
