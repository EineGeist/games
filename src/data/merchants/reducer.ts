import { Reducer } from 'redux';
import { API_TYPES, FetchAction, FetchSuccessAction } from 'api/types';
import { MerchantsState } from './types';

const initialState: MerchantsState = [];

const merchantsReducer: Reducer<MerchantsState, FetchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case API_TYPES['FETCH_DATA']: {
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
