import { GameData } from 'api/types';

export type SortOptions = 'name' | 'name-reverse';

export interface Filters {
  byFavorite: boolean;
  byCategories: string[] | 'all';
  byMerchants: string[] | 'all';
}

export type GamesArray = GameData[];
export type ChunkedGamesArray = GamesArray[];

export interface GamesState {
  allGames: GamesArray;
  gamesToDisplay: ChunkedGamesArray | null;
  maxItems: number;
  sort: SortOptions;
  filters: Filters;
  priority: string[];
}

export enum GAMES_TYPES {
  GAMES_SET_MAX_ITEMS = 'GAMES_SET_MAX_ITEMS',
  GAMES_SET_SORT = 'GAMES_SET_SORT',
  GAMES_SET_FILTERS = 'GAMES_SET_FILTERS',
}
const { GAMES_SET_MAX_ITEMS, GAMES_SET_SORT, GAMES_SET_FILTERS } = GAMES_TYPES;

export interface GamesSetMaxItemsAction {
  type: typeof GAMES_SET_MAX_ITEMS;
  payload: number;
}

export interface GamesSetSortAction {
  type: typeof GAMES_SET_SORT;
  payload: SortOptions;
}

export interface GamesSetFiltersAction {
  type: typeof GAMES_SET_FILTERS;
  payload: Partial<Filters>;
}

export type AllGamesActions =
  | GamesSetMaxItemsAction
  | GamesSetSortAction
  | GamesSetFiltersAction;
