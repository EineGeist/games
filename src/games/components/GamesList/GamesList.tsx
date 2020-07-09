import React, { FC } from 'react';
import { GamesArray } from 'games/types';
import './GamesList.scss';
import GameCard from './GameCard';
import { FavoriteGamesList } from 'favoriteGames/types';

export interface GamesListProps {
  games: GamesArray;
  favoriteGames: FavoriteGamesList;
  onToggleFavorite: (id: string) => void;
}

const GamesList: FC<GamesListProps> = ({
  games,
  favoriteGames,
  onToggleFavorite,
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
            onFavoriteClick={() => onToggleFavorite(game.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
