export interface GameData {
  id: string;
  name: string;
  imageFullPath: string;
  url: string;
  merchantId: string;
  categoryId: string[];
}

export type GamesArray = GameData[];
export type ChunkedGamesArray = GamesArray[];

export enum SortValue {
  NAME = 'name',
  NAME_REVERSE = 'name-reverse',
}

export interface Filters {
  byFavorite: boolean;
  byCategories: string[];
  byMerchants: string[];
}

export interface GamesSort {
  value: SortValue;
  name: string;
}

export interface GamesState {
  allGames: GamesArray;
  gamesToDisplay: ChunkedGamesArray | null;
  gamesPerPage: number[];
  currentGamesPerPage: number;
  sort: GamesSort[];
  currentSort: SortValue;
  filters: Filters;
  priority: string[];
  searchQuery: string;
}

export enum GAMES_TYPES {
  TOGGLE_FAVORITE = 'GAMES/TOGGLE_FAVORITE',
  SET_ITEMS_PER_PAGE = 'GAMES/SET_ITEMS_PER_PAGE',
  SET_SORT = 'GAMES/SET_SORT',
  TOGGLE_FAVORITE_FILTER = 'GAMES/TOGGLE_FAVORITE_FILTER',
  SET_CATEGORY_FILTER = 'GAMES/SET_CATEGORY_FILTER',
  SET_MERCHANT_FILTER = 'GAMES/SET_MERCHANT_FILTER',
  SET_PRIORITY = 'GAMES/SET_PRIORITY',
  SET_SEARCH_QUERY = 'GAMES/SET_SEARCH_QUERY',
}

export interface ToggleFavoriteAction {
  type: typeof GAMES_TYPES['TOGGLE_FAVORITE'];
  payload: string;
}

export interface SetItemsPerPageAction {
  type: typeof GAMES_TYPES['SET_ITEMS_PER_PAGE'];
  payload: number;
}

export interface SetSortAction {
  type: typeof GAMES_TYPES['SET_SORT'];
  payload: SortValue;
}

export interface ToggleFavoriteFilter {
  type: typeof GAMES_TYPES['TOGGLE_FAVORITE_FILTER'];
}

export interface SetCategoryFilterAction {
  type: typeof GAMES_TYPES['SET_CATEGORY_FILTER'];
  payload: string[];
}

export interface SetMerchantFilterAction {
  type: typeof GAMES_TYPES['SET_MERCHANT_FILTER'];
  payload: string[];
}

export interface SetPriorityAction {
  type: typeof GAMES_TYPES['SET_PRIORITY'];
  payload: string[];
}

export interface SetSearchQuery {
  type: typeof GAMES_TYPES['SET_SEARCH_QUERY'];
  payload: string;
}

export type AllGamesActions =
  | ToggleFavoriteAction
  | SetItemsPerPageAction
  | SetSortAction
  | ToggleFavoriteFilter
  | SetCategoryFilterAction
  | SetMerchantFilterAction
  | SetPriorityAction
  | SetSearchQuery;
