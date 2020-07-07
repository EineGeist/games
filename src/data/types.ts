import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface GameData {
  id: string;
  name: string;
  imageFullPath: string;
  url: string;
  merchantId: string;
  categoryId: string[];
}

export interface CategoryData {
  id: string;
  name: string;
}

export interface MerchantData {
  id: string;
  name: string;
}

export interface Data {
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
  payload: Data;
}

export interface FetchErrorAction extends FetchAction<'error'> {
  error: string;
}

export type AllFetchActions =
  | FetchPendingAction
  | FetchSuccessAction
  | FetchErrorAction;

export type FetchDataThunk = ActionCreator<
  ThunkAction<void, {}, void, AllFetchActions>
>;

export type FetchActions = keyof typeof FETCH_TYPES;
