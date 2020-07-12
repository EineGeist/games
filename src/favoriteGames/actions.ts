import {
  FAVORITE_GAMES_TYPES,
  FavoriteGamesList,
  SetFavoriteGamesAction,
  ToggleFavoriteGameThunk,
} from './types';

export const setFavoriteGames = (
  favoriteGames: FavoriteGamesList
): SetFavoriteGamesAction => ({
  type: FAVORITE_GAMES_TYPES['SET_FAVORITE_GAMES'],
  payload: favoriteGames,
});

export const toggleFavoriteGame: ToggleFavoriteGameThunk = (gameId: string) => (
  dispatch,
  getState
) => {
  const list = getState().favoriteGames.list;
  const newList = list.includes(gameId)
    ? list.filter((favoriteGame: string) => favoriteGame !== gameId)
    : [...list, gameId];

  dispatch(setFavoriteGames(newList));
};
