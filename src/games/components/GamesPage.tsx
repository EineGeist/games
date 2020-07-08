import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ELLIPSIS_CHAR } from 'utils';
import { AppState } from 'store/types';
import { GamesState } from 'games/types';
import './GamesPage.scss';
import GamesHeader from './GamesHeader';

const GamesPage: FC = () => {
  const params = useParams<{ page: string }>();
  const page = parseInt(params.page, 10) || null;

  const gamesToDisplay = useSelector<AppState, GamesState['gamesToDisplay']>(
    ({ games }) => games.gamesToDisplay
  );

  if (gamesToDisplay === null) return null;

  const pageIsValid = (): boolean => {
    if (!page || page < 1 || (gamesToDisplay && page > gamesToDisplay.length))
      return false;
    return true;
  };

  return pageIsValid() ? (
    <div className="games-page">
      <GamesHeader page={page!} numberOfPages={gamesToDisplay.length} />
    </div>
  ) : (
    <h2>{ELLIPSIS_CHAR}oops</h2>
  );
};

export default GamesPage;
