import React, { FC } from 'react';
import { GamesArray } from 'games/types';
import './GamesList.scss';
import GameCard from './GameCard';

export interface GamesListProps {
  games: GamesArray;
  onToggleFavorite: (id: string) => void;
}

const GamesList: FC<GamesListProps> = ({ games, onToggleFavorite }) => {
  return (
    <ul className="games-list">
      {games.map(game => (
        <li className="games-list__item" key={game.id}>
          <GameCard
            name={game.name}
            imageUrl={game.imageFullPath}
            gameUrl={game.url}
            isFavorite={game.favorite}
            onFavoriteClick={() => onToggleFavorite(game.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
