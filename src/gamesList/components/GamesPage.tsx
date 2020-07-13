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

  const gamesList = useSelector<AppState, GamesListState['list']>(
    ({ gamesList }) => gamesList.list
  );

  const favoriteGames = useSelector<AppState, FavoriteGamesList>(
    ({ favoriteGames }) => favoriteGames.list
  );

  const priorityGames = useSelector<AppState, string[]>(
    ({ games }) => games.priority
  );

  let gamesListChanged = false;

  useEffect(() => {
    gamesListChanged = true;
  }, [gamesList]);

  if (
    gamesListChanged ||
    !page ||
    page < 1 ||
    !gamesList ||
    page > Math.max(gamesList.length, 1)
  )
    return <Redirect to="/games/1" />;

  const shouldRenderGamesList = gamesList.length;

  return (
    <div className="games-page">
      <GamesHeader page={page} numberOfPages={gamesList.length || 0} />
      {shouldRenderGamesList ? (
        <GamesList
          games={gamesList[page - 1]}
          favoriteGames={favoriteGames}
          priorityGames={priorityGames}
          onToggleFavorite={gameId => dispatch(toggleFavoriteGame(gameId))}
          onTogglePriority={gameId => dispatch(togglePriority(gameId))}
        />
      ) : null}
      <GamesFooter page={page} numberOfPages={gamesList.length || 0} />
    </div>
  );
};

export default GamesPage;
