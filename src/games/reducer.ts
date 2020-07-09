import { Reducer } from 'redux';
import {
  FETCH_TYPES,
  AllFetchActions,
  FetchSuccessAction,
  FetchPendingAction,
} from 'api/types';
import { GamesState, GAMES_TYPES, AllGamesActions, SortValue } from './types';
import ProcessForDisplays from './processForDisplay';
import { FavoriteGamesList } from 'favoriteGames/types';

const initialState: GamesState = {
  allGames: [],
  gamesToDisplay: null,
  gamesPerPage: [10, 20, 40],
  currentGamesPerPage: 20,
  sort: [
    { value: SortValue['NAME'], name: 'By name' },
    { value: SortValue['NAME_REVERSE'], name: 'By name in reverse order' },
  ],
  currentSort: SortValue['NAME'],
  filters: {
    byFavorite: false,
    byCategories: [],
    byMerchants: [],
  },
  priority: [],
  searchQuery: '',
};

let processGamesToDisplay: ProcessForDisplays;
let favoriteGames: FavoriteGamesList;

const gamesReducer: Reducer<GamesState, AllFetchActions | AllGamesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES['FETCH_DATA']: {
      if (action.meta.status === 'pending')
        favoriteGames = (action as FetchPendingAction).payload;

      if (action.meta.status !== 'success') return state;
      const { payload } = action as FetchSuccessAction;

      const newState: GamesState = {
        ...state,
        allGames: payload.games,
      };

      processGamesToDisplay = new ProcessForDisplays(
        payload.categories,
        Object.values(payload.merchants),
        favoriteGames,
        newState
      );

      return processGamesToDisplay.update(newState);
    }

    case GAMES_TYPES['SET_ITEMS_PER_PAGE']: {
      return processGamesToDisplay.update({
        ...state,
        currentGamesPerPage: action.payload,
      });
    }

    case GAMES_TYPES['SET_SORT']: {
      return processGamesToDisplay.update({
        ...state,
        currentSort: action.payload,
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

    case GAMES_TYPES['SET_SEARCH_QUERY']: {
      return processGamesToDisplay.update({
        ...state,
        searchQuery: action.payload.toLowerCase(),
      });
    }

    default: {
      return state;
    }
  }
};

export default gamesReducer;
