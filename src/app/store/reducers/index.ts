import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromRequests from './requests.reducer';

// define the structure of the state tree
export interface PlatformState {
  requests: fromRequests.RequestState; // referencing the interface
}

// register our reducers
export const reducers: ActionReducerMap<PlatformState> = {
  requests: fromRequests.reducer
};

export const getPlatformState = createFeatureSelector<PlatformState>(
  'requests'
);

// requests state
