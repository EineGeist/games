import React, { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.scss';
import { BLACK_STAR } from 'utils';

export interface GameCardProps {
  name: string;
  imageUrl: string;
  gameUrl: string;
  isFavorite: boolean;
  inPriority: boolean;
  onFavoriteClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onPriorityClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const GameCard: FC<GameCardProps> = ({
  name,
  imageUrl,
  gameUrl,
  isFavorite,
  inPriority,
  onFavoriteClick,
  onPriorityClick,
}) => {
  let cardClass = 'game-card';
  if (isFavorite) cardClass += '--favorite';
  if (inPriority) cardClass += '--priority';

  return (
    <article className={cardClass}>
      <figure className="game-card__figure">
        <img
          className="game-card__image"
          src={imageUrl}
          alt={name}
          title={name}
        />
        <figcaption className="game-card__figure-caption">
          <div className="game-card__buttons-container">
            <button
              className="game-card__priority-button"
              title={isFavorite ? 'Lose priority' : 'Make priority'}
              onClick={onPriorityClick}
            >
              {'$'}
            </button>
            <button
              className="game-card__favorite-button"
              title={isFavorite ? 'Lose favorite' : 'Make favorite'}
              onClick={onFavoriteClick}
            >
              {BLACK_STAR}
            </button>
          </div>
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
