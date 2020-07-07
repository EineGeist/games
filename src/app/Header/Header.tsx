import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { sum } from 'lodash';
import './Header.scss';
import { AppState } from 'store/types';

interface AmountOfGames {
  totalGames: number;
  displayedGames: number;
}

const Header: FC = () => {
  const { totalGames, displayedGames } = useSelector<AppState, AmountOfGames>(
    ({ games: { allGames, gamesToDisplay } }) => ({
      totalGames: allGames.length,
      displayedGames: gamesToDisplay
        ? sum(gamesToDisplay.map(chunk => chunk.length))
        : allGames.length,
    })
  );

  return (
    <header className="app-header">
      {displayedGames}/{totalGames}
    </header>
  );
};

export default Header;
