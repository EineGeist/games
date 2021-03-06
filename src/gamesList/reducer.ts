import { Reducer } from 'redux';
import { FetchAction, FetchSuccessAction, API_TYPES } from 'api/types';
import {
  FAVORITE_GAMES_TYPES,
  SetFavoriteGamesAction,
} from 'data/favoriteGames/types';
import {
  GamesListState,
  SORT_OPTIONS,
  AllGamesListActions,
  GAMES_LIST_TYPES,
} from './types';
import ProcessGamesList from './processList';
import { GAMES_TYPES, SetPriorityAction } from 'data/games/types';
import { LoadStorageAction, LOCAL_STORAGE_TYPES } from 'localStorage/types';

export const initialState: GamesListState = {
  isFetching: true,
  list: [],
  gamesPerPage: 20,
  gamesPerPageOptions: [10, 20, 40],
  sort: SORT_OPTIONS['NAME'],
  sortOptions: [
    {
      value: SORT_OPTIONS['NAME'],
      name: 'By name',
    },
    {
      value: SORT_OPTIONS['NAME_REVERSE'],
      name: 'By name in reverse order',
    },
  ],
  filter: {
    byFavorite: false,
    byCategories: [],
    byMerchants: [],
    bySearchQuery: '',
  },
};

const process = new ProcessGamesList(initialState);

const gamesListReducer: Reducer<
  GamesListState,
  | FetchAction
  | AllGamesListActions
  | SetFavoriteGamesAction
  | SetPriorityAction
  | LoadStorageAction
> = (state = initialState, action) => {
  switch (action.type) {
    case API_TYPES['FETCH_DATA']: {
      if (action.meta.status === 'error')
        return { ...state, isFetching: false };
      if (action.meta.status !== 'success') return state;

      const {
        games,
        categories,
        merchants,
      } = (action as FetchSuccessAction).payload;

      return process.update(
        { ...state, isFetching: false },
        {
          allGames: games,
          allCategories: categories,
          allMerchants: merchants,
        }
      );
    }

    case LOCAL_STORAGE_TYPES['LOAD']: {
      return process.update(state, {
        favoriteGames: action.payload.state.favoriteGames.list,
      });
    }

    case GAMES_LIST_TYPES['SET_GAMES_PER_PAGE']: {
      return process.update({
        ...state,
        gamesPerPage: action.payload.gamesPerPage,
      });
    }

    case GAMES_LIST_TYPES['SET_SORT']: {
      return process.update({
        ...state,
        sort: action.payload.sort,
      });
    }

    case GAMES_LIST_TYPES['SET_FAVORITE_FILTER']: {
      return process.update({
        ...state,
        filter: {
          ...state.filter,
          byFavorite: action.payload.sortByFavorite,
        },
      });
    }

    case GAMES_LIST_TYPES['SET_CATEGORY_FILTER']: {
      return process.update({
        ...state,
        filter: {
          ...state.filter,
          byCategories: action.payload.categories,
        },
      });
    }

    case GAMES_LIST_TYPES['SET_MERCHANT_FILTER']: {
      return process.update({
        ...state,
        filter: {
          ...state.filter,
          byMerchants: action.payload.merchants,
        },
      });
    }

    case GAMES_LIST_TYPES['SET_SEARCH_QUERY']: {
      return process.update({
        ...state,
        filter: {
          ...state.filter,
          bySearchQuery: action.payload.query.trim(),
        },
      });
    }

    case GAMES_TYPES['SET_PRIORITY']: {
      return process.update(state, {
        priorityGames: action.payload,
      });
    }

    case FAVORITE_GAMES_TYPES['SET_FAVORITE_GAMES']: {
      return process.update(state, {
        favoriteGames: action.payload.list,
      });
    }

    default:
      return state;
  }
};

export default gamesListReducer;
