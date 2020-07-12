import { chunk } from 'lodash';
import { CategoriesArray } from 'categories/types';
import { MerchantsArray } from 'merchants/types';
import { FavoriteGamesList } from 'favoriteGames/types';
import { GamesArray, GameData, ChunkedGamesArray } from 'games/types';
import { GamesListState, SORT_OPTIONS } from './types';
import { compareStrings, compareStringsReverse } from 'utils';

export interface ProcessGamesListData {
  allGames?: GamesArray;
  allCategories?: CategoriesArray;
  allMerchants?: MerchantsArray;
  favoriteGames?: FavoriteGamesList;
  priorityGames?: string[];
}

export default class ProcessGamesList {
  private list: GamesArray = [];
  private chunkedList: ChunkedGamesArray = [];
  private getAllCategories: boolean = true;
  private getAllMerchants: boolean = true;

  private allGames: GamesArray = [];
  private allCategories: CategoriesArray = [];
  private allMerchants: MerchantsArray = [];
  private favoriteGames: FavoriteGamesList = [];
  private priorityGames: string[] = [];

  constructor(private state: GamesListState) {}

  update(
    state: GamesListState,
    newData: ProcessGamesListData = {}
  ): GamesListState {
    this.state = state;
    Object.assign(this, newData);

    const filterByCategories = this.state.filter.byCategories;
    const filterByMerchants = this.state.filter.byMerchants;

    this.getAllCategories =
      !filterByCategories.length ||
      filterByCategories.length >= this.allCategories.length;

    this.getAllMerchants =
      !filterByMerchants.length ||
      filterByMerchants.length >= this.allMerchants.length;

    return {
      ...state,
      list: this.filterGames().sortGames().chunkGames().chunkedList,
    };
  }

  private chunkGames() {
    this.chunkedList = chunk(this.list, this.state.gamesPerPage);

    return this;
  }

  private sortGames() {
    switch (this.state.sort) {
      case SORT_OPTIONS['NAME']: {
        this.list.sort(this.compareGames.bind(this, compareStrings));
        break;
      }

      case SORT_OPTIONS['NAME_REVERSE']: {
        this.list.sort(this.compareGames.bind(this, compareStringsReverse));
        break;
      }
    }

    return this;
  }

  private compareGames(
    compareFn: (a: string, b: string) => 1 | 0 | -1,
    a: GameData,
    b: GameData
  ) {
    let aScore = 0;

    aScore += 100 * +this.checkGameForPriority(a);
    aScore -= 100 * +this.checkGameForPriority(b);

    aScore += 10 * +this.checkGameForFavorite(a);
    aScore -= 10 * +this.checkGameForFavorite(b);

    return -aScore + compareFn(a.name, b.name);
  }

  private filterGames() {
    this.list = this.allGames.filter(this.checkGame.bind(this));

    return this;
  }

  private checkGame(game: GameData): boolean {
    return (
      this.checkGameForSearchQuery(game) &&
      !(this.state.filter.byFavorite && !this.checkGameForFavorite(game)) &&
      (this.getAllCategories || this.checkGameForCategory(game)) &&
      (this.getAllMerchants || this.checkGameForMerchant(game))
    );
  }

  private checkGameForCategory(game: GameData): boolean {
    return this.state.filter.byCategories.some(id =>
      game.categoryId.includes(id)
    );
  }

  private checkGameForMerchant(game: GameData): boolean {
    return this.state.filter.byMerchants.includes(game.merchantId);
  }

  private checkGameForPriority(game: GameData): boolean {
    return this.priorityGames.includes(game.id);
  }

  private checkGameForFavorite(game: GameData): boolean {
    return this.favoriteGames.includes(game.id);
  }

  private checkGameForSearchQuery(game: GameData): boolean {
    return game.name
      .toLowerCase()
      .includes(this.state.filter.bySearchQuery.toLowerCase());
  }
}
