import React, { FC, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'store/types';
import { FavoriteGamesList } from 'data/favoriteGames/types';
import { toggleFavoriteGame } from 'data/favoriteGames/actions';
import { togglePriority } from 'data/games/actions';
import { GamesListState } from 'gamesList/types';
import './GamesPage.scss';
import GamesHeader from './GamesHeader';
import GamesList from './GamesList/GamesList';
import GamesFooter from './GamesFooter';

const GamesPage: FC = () => {
  const dispatch = useDispatch();
  const params = useParams<{ page: string }>();
  const page = parseInt(params.page, 10);

  const gamesToDisplay = useSelector<AppState, GamesListState['list']>(
    ({ gamesList }) => gamesList.list
  );

  const favoriteGames = useSelector<AppState, FavoriteGamesList>(
    ({ favoriteGames }) => favoriteGames.list
  );

  const gamesInPriority = useSelector<AppState, string[]>(
    ({ games }) => games.priority
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
          favoriteGames={favoriteGames}
          gamesInPriority={gamesInPriority}
          onToggleFavorite={gameId => dispatch(toggleFavoriteGame(gameId))}
          onTogglePriority={gameId => dispatch(togglePriority(gameId))}
        />
      ) : null}
      <GamesFooter page={page!} numberOfPages={gamesToDisplay?.length || 0} />
    </div>
  );
};

export default GamesPage;
