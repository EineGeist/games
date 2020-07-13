import { createAction } from 'utils';
import { LOCAL_STORAGE_TYPES, LoadStorageAction } from './types';

export const loadStorage = createAction<LoadStorageAction>(
  LOCAL_STORAGE_TYPES['LOAD']
);
