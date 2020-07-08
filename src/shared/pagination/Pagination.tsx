import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ELLIPSIS_CHAR } from 'utils';
import './Pagination.scss';
import PaginationArray from './paginationArray';

export interface PaginationProps {
  currentPage: number;
  numberOfPages: number;
}

const Pagination: FC<PaginationProps> = ({ currentPage, numberOfPages }) => {
  const paginationArray = new PaginationArray(numberOfPages).getArray(
    currentPage
  );

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {paginationArray.map((page, i) => (
          <li key={i} className="pagination__item">
            {page.isLink ? (
              <Link className="pagination__link" to={page.to}>
                {page.sign}
              </Link>
            ) : (
              <span className={page.className}>{page.sign}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
