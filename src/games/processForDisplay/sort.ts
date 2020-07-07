import { SortOptions, GamesArray, GameData } from 'games/types';
import { sortStrings, sortStringsReverse } from 'utils';

const sortGames = (sort: SortOptions, games: GamesArray): GamesArray => {
  switch (sort) {
    case 'name':
      return games.sort(sortGamesByName);

    case 'name-reverse':
      return games.sort(sortGamesByNameReverse);

    default:
      return games;
  }
};

const sortGamesByName = (a: GameData, b: GameData) =>
  sortStrings(a.name, b.name);

const sortGamesByNameReverse = (a: GameData, b: GameData) =>
  sortStringsReverse(a.name, b.name);

export default sortGames;
