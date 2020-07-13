import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/types';
import { GamesArray } from 'data/games/types';
import { CategoriesArray } from 'data/categories/types';
import { MerchantsArray } from 'data/merchants/types';

export interface FetchedData {
  games: GamesArray;
  categories: CategoriesArray;
  merchants: MerchantsArray;
}

export enum API_TYPES {
  FETCH_DATA = 'FETCH_DATA',
}

interface FetchActionFactory<S extends string> {
  type: typeof API_TYPES['FETCH_DATA'];
  meta: {
    status: S;
  };
}

export interface FetchPendingAction extends FetchActionFactory<'pending'> {}

export interface FetchSuccessAction extends FetchActionFactory<'success'> {
  payload: FetchedData;
}

export interface FetchErrorAction extends FetchActionFactory<'error'> {
  error: string;
}

export type FetchAction =
  | FetchPendingAction
  | FetchSuccessAction
  | FetchErrorAction;

export type AllApiTypes = FetchAction;

export type FetchDataThunk = ActionCreator<
  ThunkAction<void, AppState, void, FetchAction>
>;
