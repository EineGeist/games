import { combineReducers } from 'redux';
import gamesReducer from 'games/reducer';
import categoriesReducer from 'categories/reducer';
import merchantsReducer from 'merchants/reducer';

export default combineReducers({
  games: gamesReducer,
  categories: categoriesReducer,
  merchants: merchantsReducer,
});
