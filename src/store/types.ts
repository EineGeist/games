import { AllApiTypes } from 'api/types';
import { GamesState, AllGamesActions } from 'data/games/types';
import { CategoriesState } from 'data/categories/types';
import { MerchantsState } from 'data/merchants/types';
import { AllGamesListActions, GamesListState } from 'gamesList/types';
import {
  FavoritesGamesState,
  AllFavoriteGamesActions,
} from 'data/favoriteGames/types';
import { AllLocalStorageActions } from 'localStorage/types';

export interface AppState {
  games: GamesState;
  gamesList: GamesListState;
  favoriteGames: FavoritesGamesState;
  categories: CategoriesState;
  merchants: MerchantsState;
}

export type AllActions =
  | AllApiTypes
  | AllGamesActions
  | AllGamesListActions
  | AllFavoriteGamesActions
  | AllLocalStorageActions;
