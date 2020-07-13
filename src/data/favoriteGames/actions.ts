import { createAction } from 'utils';
import {
  FAVORITE_GAMES_TYPES,
  SetFavoriteGamesAction,
  ToggleFavoriteGameThunk,
} from './types';

export const setFavoriteGames = createAction<SetFavoriteGamesAction>(
  FAVORITE_GAMES_TYPES['SET_FAVORITE_GAMES']
);

export const toggleFavoriteGame: ToggleFavoriteGameThunk = (gameId: string) => (
  dispatch,
  getState
) => {
  const list = getState().favoriteGames.list;
  const newList = list.includes(gameId)
    ? list.filter((favoriteGame: string) => favoriteGame !== gameId)
    : [...list, gameId];

  dispatch(setFavoriteGames({ list: newList }));
};
