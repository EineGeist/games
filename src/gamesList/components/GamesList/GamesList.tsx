import React, { FC } from 'react';
import { GamesArray } from 'data/games/types';
import { FavoriteGamesList } from 'data/favoriteGames/types';
import './GamesList.scss';
import GameCard from './GameCard';

export interface GamesListProps {
  games: GamesArray;
  favoriteGames: FavoriteGamesList;
  priorityGames: string[];
  onToggleFavorite: (id: string) => void;
  onTogglePriority: (id: string) => void;
}

const GamesList: FC<GamesListProps> = ({
  games,
  favoriteGames,
  priorityGames,
  onToggleFavorite,
  onTogglePriority,
}) => {
  return (
    <ul className="games-list">
      {games.map(game => (
        <li className="games-list__item" key={game.id}>
          <GameCard
            name={game.name}
            imageUrl={game.imageFullPath}
            gameUrl={game.url}
            isFavorite={favoriteGames.includes(game.id)}
            inPriority={priorityGames.includes(game.id)}
            onFavoriteClick={() => onToggleFavorite(game.id)}
            onPriorityClick={() => onTogglePriority(game.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
