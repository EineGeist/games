import {
  FavoriteGamesTypes,
  SetFavoriteGamesAction,
  ToggleFavoriteGameAction,
  InitFavoriteGamesAction,
} from './types';

export const initFavoriteGames = (): InitFavoriteGamesAction => ({
  type: FavoriteGamesTypes['INIT_FAVORITE_GAMES'],
});

export const setFavoriteGames = (
  favoriteGames: string[]
): SetFavoriteGamesAction => ({
  type: FavoriteGamesTypes['SET_FAVORITE_GAMES'],
  payload: favoriteGames,
});

export const toggleFavoriteGame = (
  gameId: string
): ToggleFavoriteGameAction => ({
  type: FavoriteGamesTypes['TOGGLE_FAVORITE_GAME'],
  payload: gameId,
});
