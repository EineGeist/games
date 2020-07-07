import { Reducer } from 'redux';
import { FETCH_TYPES, AllFetchActions, FetchSuccessAction } from 'api/types';
import { MerchantsState } from './types';

const initialState: MerchantsState = {};

const merchantsReducer: Reducer<MerchantsState, AllFetchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_TYPES.FETCH_DATA: {
      return action.meta.status === 'success'
        ? (action as FetchSuccessAction).payload.merchants
        : state;
    }
    default: {
      return state;
    }
  }
};

export default merchantsReducer;
