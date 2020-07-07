import { chunk } from 'lodash';
import { GameData } from 'api/types';
import {
  GamesState,
  GamesArray,
  ChunkedGamesArray,
  Filters,
  SortOptions,
} from './types';
import { sortStrings, sortStringsReverse } from 'utils';

interface FilteredGames {
  priorityGames: GamesArray;
  otherGames: GamesArray;
}

const processForDisplays = (
  state: GamesState,
  allGames: GamesArray = state.allGames
): ChunkedGamesArray | null => {
  if (!allGames.length) return null;

  const { maxItems, priority, filters, sort } = state;

  const filteredGames = filterGames(priority, filters, allGames);
  const sortedGames = sortGames(sort, filteredGames);
  return chunk(sortedGames, maxItems);
};

const filterGames = (
  priority: string[],
  filters: Filters,
  allGames: GamesArray
): GamesArray => {
  if (!shouldFilter(filters, priority)) return allGames;

  const { priorityGames, otherGames } = allGames.reduce<FilteredGames>(
    (acc, game) => {
      if (priority.includes(game.id)) {
        acc.priorityGames.push(game);
        return acc;
      }

      if (checkGame(game, filters)) {
        acc.otherGames.push(game);
      }

      return acc;
    },
    { priorityGames: [], otherGames: [] }
  );

  return [...priorityGames, ...otherGames];
};

const shouldFilter = (filters: Filters, priority: string[]): boolean => {
  return (
    filters.byCategories === 'all' &&
    filters.byMerchants === 'all' &&
    !filters.byFavorite &&
    !priority.length
  );
};

const checkGame = (
  { categoryId, merchantId, favorite }: GameData,
  { byCategories, byMerchants, byFavorite }: Filters
): boolean => {
  return (
    byCategories === 'all' ||
    ((byCategories as string[]).some(id => categoryId.includes(id)) &&
      byMerchants === 'all') ||
    (byMerchants.includes(merchantId) && !(byFavorite && !favorite))
  );
};

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

export default processForDisplays;
