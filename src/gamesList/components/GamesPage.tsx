import React, { FC, useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkForRange } from 'utils';
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
  const history = useHistory();

  const isFetching = useSelector<AppState, boolean>(
    ({ gamesList }) => gamesList.isFetching
  );

  const gamesList = useSelector<AppState, GamesListState['list']>(
    ({ gamesList }) => gamesList.list
  );

  const favoriteGames = useSelector<AppState, FavoriteGamesList>(
    ({ favoriteGames }) => favoriteGames.list
  );

  const priorityGames = useSelector<AppState, string[]>(
    ({ games }) => games.priority
  );

  useEffect(() => {
    // that way passes initial render
    return () => {
      if (!isFetching) history.push('/games/1');
    };
  }, [gamesList]);

  if (isFetching) return null;

  let shouldRedirect =
    !page || !checkForRange(page, 1, Math.max(1, gamesList.length));

  if (shouldRedirect) return <Redirect to="/games/1" />;

  return isFetching ? null : (
    <div className="games-page">
      <GamesHeader page={page} numberOfPages={gamesList.length || 0} />
      <GamesList
        games={gamesList[page - 1] || []}
        favoriteGames={favoriteGames}
        priorityGames={priorityGames}
        onToggleFavorite={gameId => dispatch(toggleFavoriteGame(gameId))}
        onTogglePriority={gameId => dispatch(togglePriority(gameId))}
      />
      <GamesFooter page={page} numberOfPages={gamesList.length || 0} />
    </div>
  );
};

export default GamesPage;
