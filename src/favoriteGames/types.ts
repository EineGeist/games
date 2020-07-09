import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/types';

export type FavoriteGamesList = string[];

export interface FavoritesGamesState {
  list: FavoriteGamesList;
}

export enum FavoriteGamesTypes {
  SET_FAVORITE_GAMES = 'FAVORITE_GAMES/SET_FAVORITE_GAMES',
}

export interface SetFavoriteGamesAction {
  type: typeof FavoriteGamesTypes['SET_FAVORITE_GAMES'];
  payload: FavoriteGamesList;
}

export type AllFavoriteGamesActions = SetFavoriteGamesAction;

export type ToggleFavoriteGameThunk = ActionCreator<
  ThunkAction<void, AppState, void, SetFavoriteGamesAction>
>;
