import { Reducer } from 'redux';
import { FETCH_TYPES, AllFetchActions, FetchSuccessAction } from 'api/types';
import { GamesState, GAMES_TYPES, AllGamesActions } from './types';
import ProcessForDisplays from './processForDisplay';

const initialState: GamesState = {
  allGames: [],
  gamesToDisplay: null,
  itemsPerPage: 20,
  sort: 'name',
  filters: {
    byFavorite: false,
    byCategories: [],
    byMerchants: [],
  },
  priority: [],
};

let processGamesToDisplay: ProcessForDisplays;

const gamesReducer: Reducer<GamesState, AllFetchActions | AllGamesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES['FETCH_DATA']: {
      if (action.meta.status !== 'success') return state;
      const { payload } = action as FetchSuccessAction;

      const newState: GamesState = {
        ...state,
        allGames: payload.games,
      };

      processGamesToDisplay = new ProcessForDisplays(
        payload.categories,
        Object.values(payload.merchants),
        newState
      );

      return processGamesToDisplay.update(newState);
    }

    case GAMES_TYPES['TOGGLE_FAVORITE']: {
      const allGames = [...state.allGames];
      const gameIndex = allGames.findIndex(game => game.id === action.payload);
      const game = { ...allGames[gameIndex] };

      game.favorite = !game.favorite;
      allGames[gameIndex] = game;

      return processGamesToDisplay.update({
        ...state,
        allGames,
      });
    }

    case GAMES_TYPES['SET_ITEMS_PER_PAGE']: {
      return processGamesToDisplay.update({
        ...state,
        itemsPerPage: action.payload,
      });
    }

    case GAMES_TYPES['SET_SORT']: {
      return processGamesToDisplay.update({
        ...state,
        sort: action.payload,
      });
    }

    case GAMES_TYPES['TOGGLE_FAVORITE_FILTER']: {
      return processGamesToDisplay.update({
        ...state,
        filters: {
          ...state.filters,
          byFavorite: !state.filters.byFavorite,
        },
      });
    }

    case GAMES_TYPES['SET_CATEGORY_FILTER']: {
      return processGamesToDisplay.update({
        ...state,
        filters: {
          ...state.filters,
          byCategories: action.payload,
        },
      });
    }

    case GAMES_TYPES['SET_MERCHANT_FILTER']: {
      return processGamesToDisplay.update({
        ...state,
        filters: {
          ...state.filters,
          byMerchants: action.payload,
        },
      });
    }

    case GAMES_TYPES['SET_PRIORITY']: {
      return processGamesToDisplay.update({
        ...state,
        priority: action.payload,
      });
    }

    default: {
      return state;
    }
  }
};

export default gamesReducer;
