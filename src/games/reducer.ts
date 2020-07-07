import { Reducer } from 'redux';
import { FETCH_TYPES, AllFetchActions, FetchSuccessAction } from 'data/types';
import { GamesState } from './types';

const initialState: GamesState = [];

const gamesReducer: Reducer<GamesState, AllFetchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES.FETCH_DATA: {
      return action.meta.status === 'success'
        ? (action as FetchSuccessAction).payload.games
        : state;
    }
    default: {
      return state;
    }
  }
};

export default gamesReducer;
