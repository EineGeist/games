import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { sum } from 'lodash';
import './Header.scss';
import { AppState } from 'store/types';

interface AmountOfGames {
  totalGames: number;
  gamesInList: number;
}

const Header: FC = () => {
  const { totalGames, gamesInList } = useSelector<AppState, AmountOfGames>(
    ({ games, gamesList }) => ({
      totalGames: games.games.length,
      gamesInList: sum(gamesList.list.map(chunk => chunk.length)),
    })
  );

  return (
    <header className="app-header">
      {gamesInList}/{totalGames}
    </header>
  );
};

export default Header;
