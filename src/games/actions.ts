import {
  GAMES_TYPES,
  SortValue,
  ToggleFavoriteAction,
  SetItemsPerPageAction,
  SetSortAction,
  ToggleFavoriteFilter,
  SetCategoryFilterAction,
  SetMerchantFilterAction,
  SetPriorityAction,
  SetSearchQuery,
  TogglePriorityThunk,
} from './types';

export const toggleFavorite = (gameId: string): ToggleFavoriteAction => ({
  type: GAMES_TYPES['TOGGLE_FAVORITE'],
  payload: gameId,
});

export const setItemsPerPage = (maxItems: number): SetItemsPerPageAction => ({
  type: GAMES_TYPES['SET_ITEMS_PER_PAGE'],
  payload: maxItems,
});

export const setSort = (sortBy: SortValue): SetSortAction => ({
  type: GAMES_TYPES['SET_SORT'],
  payload: sortBy,
});

export const toggleFavoriteFilter = (): ToggleFavoriteFilter => ({
  type: GAMES_TYPES['TOGGLE_FAVORITE_FILTER'],
});

export const setCategoryFilter = (
  categoriesIds: string[]
): SetCategoryFilterAction => ({
  type: GAMES_TYPES['SET_CATEGORY_FILTER'],
  payload: categoriesIds,
});

export const setMerchantFilter = (
  merchantsIds: string[]
): SetMerchantFilterAction => ({
  type: GAMES_TYPES['SET_MERCHANT_FILTER'],
  payload: merchantsIds,
});

export const setPriority = (gamesIds: string[]): SetPriorityAction => ({
  type: GAMES_TYPES['SET_PRIORITY'],
  payload: gamesIds,
});

export const setSearchQuery = (subString: string): SetSearchQuery => ({
  type: GAMES_TYPES['SET_SEARCH_QUERY'],
  payload: subString,
});

export const togglePriority: TogglePriorityThunk = (gameId: string) => (
  dispatch,
  getState
) => {
  const priorityList = getState().games.priority;
  const newPriorityList = priorityList.includes(gameId)
    ? priorityList.filter((gameInPriority: string) => gameInPriority !== gameId)
    : [...priorityList, gameId];

  dispatch(setPriority(newPriorityList));
};
