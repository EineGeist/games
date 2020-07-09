import { Reducer } from 'redux';
import {
  FavoriteGamesTypes,
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
    case FavoriteGamesTypes['SET_FAVORITE_GAMES']: {
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
