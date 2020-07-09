import {
  FavoriteGamesTypes,
  FavoriteGamesList,
  SetFavoriteGamesAction,
  ToggleFavoriteGameThunk,
} from './types';

export const setFavoriteGames = (
  favoriteGames: FavoriteGamesList
): SetFavoriteGamesAction => ({
  type: FavoriteGamesTypes['SET_FAVORITE_GAMES'],
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
