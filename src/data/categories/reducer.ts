import { Reducer } from 'redux';
import { API_TYPES, FetchAction, FetchSuccessAction } from 'api/types';
import { CategoriesState } from './types';

const initialState: CategoriesState = [];

const categoriesReducer: Reducer<CategoriesState, FetchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case API_TYPES['FETCH_DATA']: {
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
