import { combineReducers } from 'redux';
import gamesReducer from 'games/reducer';
import favoriteGamesReducer from 'favoriteGames/reducer';
import categoriesReducer from 'categories/reducer';
import merchantsReducer from 'merchants/reducer';

export default combineReducers({
  games: gamesReducer,
  favoriteGames: favoriteGamesReducer,
  categories: categoriesReducer,
  merchants: merchantsReducer,
});
