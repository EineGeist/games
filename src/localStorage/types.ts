import { LocalStorageState } from './localStorage';

export enum LOCAL_STORAGE_TYPES {
  LOAD = 'LOCAL_STORAGE/LOAD',
}

export interface LoadStorageAction {
  type: typeof LOCAL_STORAGE_TYPES['LOAD'];
  payload: { state: LocalStorageState };
}

export type AllLocalStorageActions = LoadStorageAction;
