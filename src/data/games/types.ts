import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from 'store/types';

export interface GameData {
  id: string;
  name: string;
  imageFullPath: string;
  url: string;
  merchantId: string;
  categoryId: string[];
}

export type GamesArray = GameData[];
export type ChunkedGamesArray = GamesArray[];

export interface GamesState {
  games: GamesArray;
  priority: string[];
}

export enum GAMES_TYPES {
  SET_PRIORITY = 'GAMES/SET_PRIORITY',
}

export interface SetPriorityAction {
  type: typeof GAMES_TYPES['SET_PRIORITY'];
  payload: string[];
}

export type AllGamesActions = SetPriorityAction;

export type TogglePriorityThunk = ActionCreator<
  ThunkAction<void, AppState, void, SetPriorityAction>
>;
