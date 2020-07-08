import React, { FC } from 'react';
import Pagination from 'shared/pagination/Pagination';
import './GamesFooter.scss';

export interface GamesFooterProps {
  page: number;
  numberOfPages: number;
}

const GamesFooter: FC<GamesFooterProps> = ({ page, numberOfPages }) => {
  if (!numberOfPages) return null;

  return (
    <footer className="games-footer">
      <Pagination currentPage={page} numberOfPages={numberOfPages} />
    </footer>
  );
};

export default GamesFooter;
