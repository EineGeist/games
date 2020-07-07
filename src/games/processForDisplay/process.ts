import { chunk } from 'lodash';
import { GamesState, GamesArray, ChunkedGamesArray } from 'games/types';
import filterGames from './filter';
import sortGames from './sort';

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

export default processForDisplays;
