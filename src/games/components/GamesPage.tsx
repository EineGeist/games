import React, { FC, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ELLIPSIS_CHAR } from 'utils';
import { AppState } from 'store/types';
import { GamesState } from 'games/types';
import { toggleFavorite } from 'games/actions';
import './GamesPage.scss';
import GamesHeader from './GamesHeader';
import GamesList from './GamesList/GamesList';
import GamesFooter from './GamesFooter';
import { toggleFavorite } from 'games/actions';

const GamesPage: FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ page: string }>();
  const page = parseInt(params.page, 10);

  const gamesToDisplay = useSelector<AppState, GamesState['gamesToDisplay']>(
    ({ games }) => games.gamesToDisplay
  );

  let gamesToDisplayChanged = false;

  useEffect(() => {
    gamesToDisplayChanged = true;
  }, [gamesToDisplay]);

  if (
    gamesToDisplayChanged ||
    !page ||
    page < 1 ||
    !gamesToDisplay ||
    page > Math.max(gamesToDisplay.length, 1)
  )
    return <Redirect to="/games/1" />;

  const shouldRenderGamesList = gamesToDisplay.length;

  return (
    <div className="games-page">
      <GamesHeader page={page} numberOfPages={gamesToDisplay?.length || 0} />
      {shouldRenderGamesList ? (
        <GamesList
          games={gamesToDisplay[page - 1]}
          onToggleFavorite={gameId => dispatch(toggleFavorite(gameId))}
        />
      ) : null}
      <GamesFooter page={page!} numberOfPages={gamesToDisplay?.length || 0} />
    </div>
  );
};

export default GamesPage;
