export const favoriteGamesStorage = new (class {
  private readonly LOCAL_STORAGE_KEY = 'favoriteGames';
  private _favoritesList: string[] = [];

  set favoritesList(newFavorites: string[]) {
    this._favoritesList = newFavorites;
    this.save();
  }

  get favoritesList() {
    return this._favoritesList;
  }

  save() {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this._favoritesList)
    );
  }

  load() {
    const serialized = localStorage.getItem(this.LOCAL_STORAGE_KEY);

    if (serialized) {
      this._favoritesList = JSON.parse(serialized);
    }

    return this;
  }
})();
