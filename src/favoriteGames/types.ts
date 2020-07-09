export type FavoriteGamesList = string[];

export interface FavoritesGamesState {
  list: FavoriteGamesList;
}

export enum FavoriteGamesTypes {
  INIT_FAVORITE_GAMES = 'FAVORITE_GAMES/INIT_FAVORITE_GAMES',
  SET_FAVORITE_GAMES = 'FAVORITE_GAMES/SET_FAVORITE_GAMES',
  TOGGLE_FAVORITE_GAME = 'FAVORITE_GAMES/TOGGLE_FAVORITE_GAME',
}

export interface InitFavoriteGamesAction {
  type: typeof FavoriteGamesTypes['INIT_FAVORITE_GAMES'];
}

export interface SetFavoriteGamesAction {
  type: typeof FavoriteGamesTypes['SET_FAVORITE_GAMES'];
  payload: string[];
}

export interface ToggleFavoriteGameAction {
  type: typeof FavoriteGamesTypes['TOGGLE_FAVORITE_GAME'];
  payload: string;
}

export type AllFavoriteGamesActions =
  | InitFavoriteGamesAction
  | SetFavoriteGamesAction
  | ToggleFavoriteGameAction;
