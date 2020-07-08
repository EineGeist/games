import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.scss';
import { BLACK_STAR } from 'utils';

export interface GameCardProps {
  name: string;
  imageUrl: string;
  gameUrl: string;
  isFavorite: boolean;
  onFavoriteClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const GameCard: FC<GameCardProps> = ({
  name,
  imageUrl,
  gameUrl,
  isFavorite,
  onFavoriteClick,
}) => {
  return (
    <article className="game-card">
      <figure className="game-card__figure">
        <img
          className="game-card__image"
          src={imageUrl}
          alt={name}
          title={name}
        />
        <figcaption className="game-card__figure-caption">
          <button
            className={`game-card__favorite${isFavorite ? '--favorite' : ''}`}
            title={isFavorite ? 'Lose favorite' : 'Make favorite'}
            onClick={onFavoriteClick}
          >
            {BLACK_STAR}
          </button>
          <h3 className="game-card__name">{name}</h3>
          <Link className="game-card__link" to={gameUrl}>
            Play
          </Link>
        </figcaption>
      </figure>
    </article>
  );
};

export default GameCard;
