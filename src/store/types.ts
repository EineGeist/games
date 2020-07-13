import { AllFetchActions } from 'api/types';
import { GamesState, AllGamesActions } from 'games/types';
import { AllGamesListActions, GamesListState } from 'gamesList/types';
import { CategoriesState } from 'categories/types';
import { MerchantsState } from 'merchants/types';
import {
  FavoritesGamesState,
  AllFavoriteGamesActions,
} from 'favoriteGames/types';
import { AllLocalStorageActions } from 'localStorage/types';

export interface AppState {
  games: GamesState;
  gamesList: GamesListState;
  favoriteGames: FavoritesGamesState;
  categories: CategoriesState;
  merchants: MerchantsState;
}

export type AllActions =
  | AllFetchActions
  | AllGamesActions
  | AllGamesListActions
  | AllFavoriteGamesActions
  | AllLocalStorageActions;
