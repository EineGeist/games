import { AllFetchActions } from 'api/types';
import { GamesState, AllGamesActions } from 'games/types';
import { CategoriesState } from 'categories/types';
import { MerchantsState } from 'merchants/types';

export interface AppState {
  games: GamesState;
  categories: CategoriesState;
  merchants: MerchantsState;
}

export type AllActions = AllFetchActions | AllGamesActions;
