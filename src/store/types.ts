import { AllFetchActions } from 'api/types';
import { GamesState, AllGamesActions } from 'games/types';
import { CategoriesState } from 'categories/types';
import { MerchantsState } from 'merchants/types';
import {
  FavoritesGamesState,
  AllFavoriteGamesActions,
} from 'favoriteGames/types';

export interface AppState {
  games: GamesState;
  favoriteGames: FavoritesGamesState;
  categories: CategoriesState;
  merchants: MerchantsState;
}

export type AllActions =
  | AllFetchActions
  | AllGamesActions
  | AllFavoriteGamesActions;
