import { LoadStorageAction, LOCAL_STORAGE_TYPES } from 'localStorage/types';
import { Reducer } from 'redux';
import {
  FAVORITE_GAMES_TYPES,
  FavoritesGamesState,
  AllFavoriteGamesActions,
} from './types';

const initialState: FavoritesGamesState = {
  list: [],
};

const favoriteGamesReducer: Reducer<
  FavoritesGamesState,
  AllFavoriteGamesActions | LoadStorageAction
> = (state = initialState, action) => {
  switch (action.type) {
    case LOCAL_STORAGE_TYPES['LOAD']: {
      return {
        ...state,
        list: action.payload.state.favoriteGames.list,
      };
    }

    case FAVORITE_GAMES_TYPES['SET_FAVORITE_GAMES']: {
      return {
        ...state,
        list: action.payload.list,
      };
    }

    default: {
      return state;
    }
  }
};

export default favoriteGamesReducer;
