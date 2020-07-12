import { Reducer } from 'redux';
import {
  FAVORITE_GAMES_TYPES,
  FavoritesGamesState,
  AllFavoriteGamesActions,
} from './types';
import { favoriteGamesStorage } from './localStorage';

const initialState: FavoritesGamesState = {
  list: favoriteGamesStorage.load().favoritesList,
};

const favoriteGamesReducer: Reducer<
  FavoritesGamesState,
  AllFavoriteGamesActions
> = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_GAMES_TYPES['SET_FAVORITE_GAMES']: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default favoriteGamesReducer;
