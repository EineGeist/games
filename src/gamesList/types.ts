import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/types';
import { ChunkedGamesArray } from 'data/games/types';

export const gamesPerPageOptions = [10, 20, 40];

export enum SORT_OPTIONS {
  NAME = 'name',
  NAME_REVERSE = 'name-reverse',
}

export interface SortOption {
  value: SORT_OPTIONS;
  name: string;
}

export interface Filter {
  byFavorite: boolean;
  byCategories: string[];
  byMerchants: string[];
  bySearchQuery: string;
}

export interface GamesListState {
  isFetching: boolean;
  list: ChunkedGamesArray;
  gamesPerPageOptions: number[];
  gamesPerPage: number;
  sortOptions: SortOption[];
  sort: SORT_OPTIONS;
  filter: Filter;
}

export enum GAMES_LIST_TYPES {
  SET_FAVORITE_FILTER = 'GAMES_LIST/SET_FAVORITE_FILTER',
  SET_CATEGORY_FILTER = 'GAMES_LIST/SET_CATEGORY_FILTER',
  SET_MERCHANT_FILTER = 'GAMES_LIST/SET_MERCHANT_FILTER',
  SET_GAMES_PER_PAGE = 'GAMES_LIST/SET_GAMES_PER_PAGE',
  SET_SORT = 'GAMES_LIST/SET_SORT',
  SET_SEARCH_QUERY = 'GAMES/SET_SEARCH_QUERY',
}

export interface SetGamesPerPageAction {
  type: typeof GAMES_LIST_TYPES['SET_GAMES_PER_PAGE'];
  payload: { gamesPerPage: number };
}

export interface SetGamesSortAction {
  type: typeof GAMES_LIST_TYPES['SET_SORT'];
  payload: { sort: SORT_OPTIONS };
}

export interface SetFavoriteFilterAction {
  type: typeof GAMES_LIST_TYPES['SET_FAVORITE_FILTER'];
  payload: { sortByFavorite: boolean };
}

export interface SetCategoryFilterAction {
  type: typeof GAMES_LIST_TYPES['SET_CATEGORY_FILTER'];
  payload: { categories: string[] };
}

export interface SetMerchantFilterAction {
  type: typeof GAMES_LIST_TYPES['SET_MERCHANT_FILTER'];
  payload: { merchants: string[] };
}

export interface SetSearchQueryAction {
  type: typeof GAMES_LIST_TYPES['SET_SEARCH_QUERY'];
  payload: { query: string };
}

export type AllGamesListActions =
  | SetGamesPerPageAction
  | SetGamesSortAction
  | SetFavoriteFilterAction
  | SetCategoryFilterAction
  | SetMerchantFilterAction
  | SetSearchQueryAction;

export type ToggleFavoriteFilterThunk = ActionCreator<
  ThunkAction<void, AppState, void, SetFavoriteFilterAction>
>;
