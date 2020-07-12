import { createAction } from 'utils';
import {
  GAMES_LIST_TYPES,
  SetGamesPerPageAction,
  SetGamesSortAction,
  SetFavoriteFilterAction,
  SetCategoryFilterAction,
  SetMerchantFilterAction,
  SetSearchQueryAction,
  ToggleFavoriteFilterThunk,
} from './types';

export const setGamesPerPage = createAction<SetGamesPerPageAction>(
  GAMES_LIST_TYPES['SET_GAMES_PER_PAGE']
);

export const setGamesSort = createAction<SetGamesSortAction>(
  GAMES_LIST_TYPES['SET_SORT']
);

export const setFavoriteFilter = createAction<SetFavoriteFilterAction>(
  GAMES_LIST_TYPES['SET_FAVORITE_FILTER']
);

export const setCategoriesFilter = createAction<SetCategoryFilterAction>(
  GAMES_LIST_TYPES['SET_CATEGORY_FILTER']
);

export const setMerchantsFilter = createAction<SetMerchantFilterAction>(
  GAMES_LIST_TYPES['SET_MERCHANT_FILTER']
);

export const setSearchQuery = createAction<SetSearchQueryAction>(
  GAMES_LIST_TYPES['SET_SEARCH_QUERY']
);

export const toggleFavoriteFilter: ToggleFavoriteFilterThunk = () => (
  dispatch,
  getState
) => {
  const currentState = getState().gamesList.filter.byFavorite;

  dispatch(setFavoriteFilter({ sortByFavorite: !currentState }));
};
