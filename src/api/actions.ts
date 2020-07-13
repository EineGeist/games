import { FetchDataThunk, API_TYPES } from './types';
import api from './api';

export const fetchData: FetchDataThunk = () => async dispatch => {
  const type = API_TYPES['FETCH_DATA'];

  dispatch({
    type,
    meta: { status: 'pending' },
  });

  const response = await api.requestData();

  if (response.ok && response.data) {
    dispatch({
      type,
      payload: response.data,
      meta: { status: 'success' },
    });
  } else {
    dispatch({
      type,
      error: response.error,
      meta: { status: 'error' },
    });
  }
};
