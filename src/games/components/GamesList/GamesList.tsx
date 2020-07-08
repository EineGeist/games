import React, { FC } from 'react';
import { GamesArray } from 'games/types';
import './GamesList.scss';
import GameCard from './GameCard';

export interface GamesListProps {
  games: GamesArray;
}

const GamesList: FC<GamesListProps> = ({ games }) => {
  return (
    <ul className="games-list">
      {games.map(game => (
        <li className="games-list__item" key={game.id}>
          <GameCard
            name={game.name}
            imageUrl={game.imageFullPath}
            gameUrl={game.url}
          />
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
