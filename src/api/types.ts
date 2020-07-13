import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/types';
import { GameData } from 'games/types';
import { CategoryData } from 'categories/types';
import { MerchantData } from 'merchants/types';
import { FavoriteGamesList } from 'favoriteGames/types';

export interface FetchedData {
  games: GameData[];
  categories: CategoryData[];
  merchants: {
    [prop: string]: MerchantData;
  };
}

export enum FETCH_TYPES {
  FETCH_DATA = 'FETCH_DATA',
}

interface FetchAction<S extends string> {
  type: typeof FETCH_TYPES['FETCH_DATA'];
  meta: {
    status: S;
  };
}

export interface FetchPendingAction extends FetchAction<'pending'> {}

export interface FetchSuccessAction extends FetchAction<'success'> {
  payload: FetchedData;
}

export interface FetchErrorAction extends FetchAction<'error'> {
  error: string;
}

export type AllFetchActions =
  | FetchPendingAction
  | FetchSuccessAction
  | FetchErrorAction;

export type FetchDataThunk = ActionCreator<
  ThunkAction<void, AppState, void, AllFetchActions>
>;
