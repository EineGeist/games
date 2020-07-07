import { Reducer } from 'redux';
import { FETCH_TYPES, AllFetchActions, FetchSuccessAction } from 'data/types';
import { CategoriesState } from './types';

const initialState: CategoriesState = [];

const categoriesReducer: Reducer<CategoriesState, AllFetchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES.FETCH_DATA: {
      return action.meta.status === 'success'
        ? (action as FetchSuccessAction).payload.categories
        : state;
    }
    default: {
      return state;
    }
  }
};

export default categoriesReducer;
