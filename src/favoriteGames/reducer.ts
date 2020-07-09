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

    case FavoriteGamesTypes['TOGGLE_FAVORITE_GAME']: {
      const newList = state.list.includes(action.payload)
        ? state.list.filter(game => game !== action.payload)
        : [...state.list, action.payload];

      favoriteGamesStorage.favoritesList = newList;

      return {
        ...state,
        list: newList,
      };
    }

    default: {
      return state;
    }
  }
};

export default favoriteGamesReducer;
