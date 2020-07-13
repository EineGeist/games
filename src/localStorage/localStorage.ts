import { FavoritesGamesState } from 'data/favoriteGames/types';
import { throttle } from 'lodash';
import store from 'store/store';
import { loadStorage } from './actions';

export interface LocalStorageState {
  favoriteGames: FavoritesGamesState;
}

class StateLocalStorage {
  private static instance: StateLocalStorage;
  private readonly LOCAL_STORAGE_KEY = 'appState';

  private constructor() {}

  public static getInstance(): StateLocalStorage {
    if (!StateLocalStorage.instance) {
      StateLocalStorage.instance = new StateLocalStorage();
    }

    return StateLocalStorage.instance;
  }

  private save() {
    const { favoriteGames } = store.getState();

    try {
      localStorage.setItem(
        this.LOCAL_STORAGE_KEY,
        JSON.stringify({ favoriteGames })
      );
    } catch (err) {}
  }

  load() {
    const serialized = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if (!serialized) return;

    store.dispatch(loadStorage({ state: JSON.parse(serialized) }));
  }

  watch() {
    store.subscribe(throttle(this.save.bind(this), 1000));
  }
}

export default StateLocalStorage.getInstance();
