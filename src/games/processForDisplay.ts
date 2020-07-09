import { chunk } from 'lodash';
import { CategoriesArray } from 'categories/types';
import { MerchantsArray } from 'merchants/types';
import { FavoriteGamesList } from 'favoriteGames/types';
import { GamesState, GamesArray, GameData, SortValue } from './types';
import { sortStrings, sortStringsReverse } from 'utils';

export default class ProcessForDisplays {
  private getAllCategories: boolean = true;
  private getAllMerchants: boolean = true;

  constructor(
    private allCategories: CategoriesArray,
    private allMerchants: MerchantsArray,
    private favoriteGames: FavoriteGamesList,
    private gamesState: GamesState
  ) {}

  update(
    gamesState: GamesState,
    favoriteGames?: FavoriteGamesList
  ): GamesState {
    if (favoriteGames) {
      this.favoriteGames = favoriteGames;
    }

    this.gamesState = gamesState;

    this.getAllCategories =
      this.gamesState.filters.byCategories.length ===
        this.allCategories.length ||
      !this.gamesState.filters.byCategories.length;

    this.getAllMerchants =
      this.gamesState.filters.byMerchants.length === this.allMerchants.length ||
      !this.gamesState.filters.byMerchants.length;

    return {
      ...this.gamesState,
      gamesToDisplay: chunk(
        this.filterGames(this.sortGames(this.gamesState.allGames)),
        this.gamesState.currentGamesPerPage
      ),
    };
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

    const {
      priorityGames,
      favoriteGames,
      otherGames,
    } = this.gamesState.allGames.reduce<{
      priorityGames: GamesArray;
      favoriteGames: GamesArray;
      otherGames: GamesArray;
    }>(
      (acc, game) => {
        const checkResult = this.checkGame(game);
        if (!checkResult) return acc;

        const { inPriority, isFavorite } = checkResult;

        if (this.gamesState.filters.byFavorite) {
          if (isFavorite) {
            acc.favoriteGames.push(game);
          }
        } else {
          if (inPriority) {
            acc.priorityGames.push(game);
          } else if (isFavorite) {
            acc.favoriteGames.push(game);
          } else {
            acc.otherGames.push(game);
          }
        }

        return acc;
      },
      { priorityGames: [], favoriteGames: [], otherGames: [] }
    );

    return [...priorityGames, ...favoriteGames, ...otherGames];
  }

  private checkGame(
    game: GameData
  ):
    | {
        inPriority: boolean;
        isFavorite: boolean;
      }
    | false {
    return (
      this.checkGameForSearchQuery(game) &&
      this.checkGameForCategory(game) &&
      this.checkGameForMerchant(game) && {
        inPriority: this.checkGameForPriority(game),
        isFavorite: this.checkGameForFavorite(game),
      }
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
    return this.favoriteGames.includes(game.id);
  }

  private checkGameForSearchQuery(game: GameData): boolean {
    return game.name.toLowerCase().includes(this.gamesState.searchQuery);
  }

  private shouldFilter(): boolean {
    const {
      getAllCategories,
      getAllMerchants,
      favoriteGames,
      gamesState: { filters, priority, searchQuery },
    } = this;

    return (
      !!favoriteGames.length ||
      !!searchQuery ||
      !getAllCategories ||
      !getAllMerchants ||
      filters.byFavorite ||
      !!priority.length
    );
  }
}
