import { Filters, GamesArray, GameData } from 'games/types';

const filterGames = (
  priority: string[],
  filters: Filters,
  allGames: GamesArray
): GamesArray => {
  if (!shouldFilter(filters, priority)) return allGames;

  const { priorityGames, otherGames } = allGames.reduce<{
    priorityGames: GamesArray;
    otherGames: GamesArray;
  }>(
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
    filters.byCategories !== 'all' ||
    filters.byMerchants !== 'all' ||
    filters.byFavorite ||
    !!priority.length
  );
};

const checkGame = (
  { categoryId, merchantId, favorite }: GameData,
  { byCategories, byMerchants, byFavorite }: Filters
): boolean => {
  return (
    checkCategories(categoryId, byCategories) &&
    checkMerchant(merchantId, byMerchants) &&
    checkFavorite(favorite, byFavorite)
  );
};

const checkCategories = (
  categoryId: string[],
  byCategories: Filters['byCategories']
) => {
  return (
    byCategories === 'all' ||
    (byCategories as string[]).some(id => categoryId.includes(id))
  );
};

const checkMerchant = (
  merchantId: string,
  byMerchants: Filters['byMerchants']
) => {
  return byMerchants === 'all' || byMerchants.includes(merchantId);
};

const checkFavorite = (favorite: boolean, byFavorite: boolean) => {
  return !(byFavorite && !favorite);
};

export default filterGames;
