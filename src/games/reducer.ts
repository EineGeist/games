import { Reducer } from 'redux';
import { API_TYPES, FetchAction, FetchSuccessAction } from 'api/types';
import { GamesState, GAMES_TYPES, AllGamesActions } from './types';
import { SetFavoriteGamesAction } from 'favoriteGames/types';

const initialState: GamesState = {
  games: [],
  priority: [],
};

const gamesReducer: Reducer<
  GamesState,
  FetchAction | AllGamesActions | SetFavoriteGamesAction
> = (state = initialState, action) => {
  switch (action.type) {
    case API_TYPES['FETCH_DATA']: {
      if (action.meta.status !== 'success') return state;

      return {
        ...state,
        games: (action as FetchSuccessAction).payload.games,
      };
    }

    case GAMES_TYPES['SET_PRIORITY']: {
      return {
        ...state,
        priority: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default gamesReducer;
