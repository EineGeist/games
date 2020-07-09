import React, { FC } from 'react';
import Pagination from 'shared/pagination/Pagination';
import GamesSelection from './GamesSelection/GamesSelection';
import './GamesHeader.scss';

export interface GamesHeaderProps {
  page: number;
  numberOfPages: number;
}

const GamesHeader: FC<GamesHeaderProps> = ({ page, numberOfPages }) => {
  return (
    <header className="games-header">
      <GamesSelection />
      <Pagination currentPage={page} numberOfPages={numberOfPages} />
    </header>
  );
};

export default GamesHeader;
