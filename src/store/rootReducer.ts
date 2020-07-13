import { combineReducers } from 'redux';
import gamesReducer from 'data/games/reducer';
import favoriteGamesReducer from 'data/favoriteGames/reducer';
import categoriesReducer from 'data/categories/reducer';
import merchantsReducer from 'data/merchants/reducer';
import gamesListReducer from 'gamesList/reducer';

export default combineReducers({
  games: gamesReducer,
  gamesList: gamesListReducer,
  favoriteGames: favoriteGamesReducer,
  categories: categoriesReducer,
  merchants: merchantsReducer,
});
