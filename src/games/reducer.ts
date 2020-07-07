import { Reducer } from 'redux';
import { FETCH_TYPES, AllFetchActions, FetchSuccessAction } from 'api/types';
import {
  GamesState,
  GAMES_TYPES,
  AllGamesActions,
  GamesSetMaxItemsAction,
  GamesSetSortAction,
  GamesSetFiltersAction,
} from './types';
import processForDisplays from './processForDisplay/process';

const initialState: GamesState = {
  allGames: [],
  gamesToDisplay: null,
  maxItems: 20,
  sort: 'name',
  filters: {
    byFavorite: false,
    byCategories: 'all',
    byMerchants: 'all',
  },
  priority: [],
};

const gamesReducer: Reducer<GamesState, AllFetchActions | AllGamesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES.FETCH_DATA: {
      const { meta, payload } = action as FetchSuccessAction;

      if (meta.status !== 'success') return state;

      const allGames = payload.games;
      const gamesToDisplay = processForDisplays(state, allGames);

      return {
        ...state,
        allGames,
        gamesToDisplay,
      };
    }

    case GAMES_TYPES.GAMES_SET_MAX_ITEMS: {
      return {
        ...state,
        maxItems: (action as GamesSetMaxItemsAction).payload,
      };
    }

    case GAMES_TYPES.GAMES_SET_SORT: {
      return {
        ...state,
        sort: (action as GamesSetSortAction).payload,
      };
    }

    case GAMES_TYPES.GAMES_SET_FILTERS: {
      const { byFavorite, byCategories, byMerchants } = state.filters;
      const { payload } = action as GamesSetFiltersAction;

      const filters = {
        byFavorite: payload.byFavorite ?? byFavorite,
        byCategories: payload.byCategories ?? byCategories,
        byMerchants: payload.byMerchants ?? byMerchants,
      };

      return {
        ...state,
        filters,
      };
    }

    default: {
      return state;
    }
  }
};

export default gamesReducer;
