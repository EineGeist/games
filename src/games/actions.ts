import {
  GAMES_TYPES,
  GamesSetMaxItemsAction,
  GamesSetSortAction,
  GamesSetFiltersAction,
  SortOptions,
  Filters,
} from './types';

export const gamesSetGamesMaxItems = (
  maxItems: number
): GamesSetMaxItemsAction => ({
  type: GAMES_TYPES.GAMES_SET_MAX_ITEMS,
  payload: maxItems,
});

export const gamesSetSort = (sortBy: SortOptions): GamesSetSortAction => ({
  type: GAMES_TYPES.GAMES_SET_SORT,
  payload: sortBy,
});

export const gamesSetFilter = (
  filters: Partial<Filters>
): GamesSetFiltersAction => ({
  type: GAMES_TYPES.GAMES_SET_FILTERS,
  payload: filters,
});
