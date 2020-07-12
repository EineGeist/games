import { GAMES_TYPES, SetPriorityAction, TogglePriorityThunk } from './types';

export const setPriority = (gamesIds: string[]): SetPriorityAction => ({
  type: GAMES_TYPES['SET_PRIORITY'],
  payload: gamesIds,
});

export const togglePriority: TogglePriorityThunk = (gameId: string) => (
  dispatch,
  getState
) => {
  const priorityList = getState().games.priority;
  const newPriorityList = priorityList.includes(gameId)
    ? priorityList.filter((gameInPriority: string) => gameInPriority !== gameId)
    : [...priorityList, gameId];

  dispatch(setPriority(newPriorityList));
};
