import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './GameCard.scss';
import { BLACK_STAR } from 'utils';

export interface GameCardProps {
  name: string;
  imageUrl: string;
  gameUrl: string;
}

const GameCard: FC<GameCardProps> = ({ name, imageUrl, gameUrl }) => {
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
          <button className="game-card__make-favorite" title="Make favorite">
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
