import { chunk } from 'lodash';
import { CategoriesArray } from 'categories/types';
import { MerchantsArray } from 'merchants/types';
import { GamesState, GamesArray, GameData, SortValue } from './types';
import { sortStrings, sortStringsReverse } from 'utils';

export default class ProcessForDisplays {
  private getAllCategories: boolean = true;
  private getAllMerchants: boolean = true;

  constructor(
    private allCategories: CategoriesArray,
    private allMerchants: MerchantsArray,
    private gamesState: GamesState
  ) {}

  update(gamesState: GamesState): GamesState {
    this.gamesState = gamesState;

    this.getAllCategories =
      this.gamesState.filters.byCategories.length ===
        this.allCategories.length ||
      !this.gamesState.filters.byCategories.length;

    this.getAllMerchants =
      this.gamesState.filters.byMerchants.length === this.allMerchants.length ||
      !this.gamesState.filters.byMerchants.length;

    this.gamesState.gamesToDisplay = chunk(
      this.sortGames(this.filterGames(this.gamesState.allGames)),
      this.gamesState.currentGamesPerPage
    );

    return this.gamesState;
  }

  private sortGames(gamesArray: GamesArray): GamesArray {
    switch (this.gamesState.currentSort) {
      case SortValue['NAME']:
        return gamesArray.sort(this.sortGamesByName);

      case SortValue['NAME_REVERSE']:
        return gamesArray.sort(this.sortGamesByNameReverse);

      default:
        return gamesArray;
    }
  }

  private sortGamesByName(a: GameData, b: GameData) {
    return sortStrings(a.name, b.name);
  }

  private sortGamesByNameReverse(a: GameData, b: GameData) {
    return sortStringsReverse(a.name, b.name);
  }

  private filterGames(gamesArray: GamesArray): GamesArray {
    if (!this.shouldFilter()) return gamesArray;

    const { priorityGames, otherGames } = this.gamesState.allGames.reduce<{
      priorityGames: GamesArray;
      otherGames: GamesArray;
    }>(
      (acc, game) => {
        if (this.checkGameForPriority(game)) {
          acc.priorityGames.push(game);
        } else if (this.checkGame(game)) {
          acc.otherGames.push(game);
        }

        return acc;
      },
      { priorityGames: [], otherGames: [] }
    );

    return [...priorityGames, ...otherGames];
  }

  private checkGame(game: GameData): boolean {
    return (
      this.checkGameForCategory(game) &&
      this.checkGameForMerchant(game) &&
      this.checkGameForFavorite(game)
    );
  }

  private checkGameForPriority(game: GameData): boolean {
    return this.gamesState.priority.includes(game.id);
  }

  private checkGameForCategory(game: GameData): boolean {
    return (
      this.getAllCategories ||
      this.gamesState.filters.byCategories.some(id =>
        game.categoryId.includes(id)
      )
    );
  }

  private checkGameForMerchant(game: GameData): boolean {
    return (
      this.getAllMerchants ||
      this.gamesState.filters.byMerchants.includes(game.merchantId)
    );
  }

  private checkGameForFavorite(game: GameData): boolean {
    return !(this.gamesState.filters.byFavorite && !game.favorite);
  }

  private shouldFilter(): boolean {
    const {
      getAllCategories,
      getAllMerchants,
      gamesState: { filters, priority },
    } = this;

    return (
      !getAllCategories ||
      !getAllMerchants ||
      filters.byFavorite ||
      !!priority.length
    );
  }
}
