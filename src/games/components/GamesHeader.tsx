import React, { FC } from 'react';
import Pagination from 'shared/pagination/Pagination';
import './GamesHeader.scss';

export interface GamesHeaderProps {
  page: number;
  numberOfPages: number;
}

const GamesHeader: FC<GamesHeaderProps> = ({ page, numberOfPages }) => {
  return (
    <header className="games-header">
      <Pagination currentPage={page} numberOfPages={numberOfPages} />
    </header>
  );
};

export default GamesHeader;
