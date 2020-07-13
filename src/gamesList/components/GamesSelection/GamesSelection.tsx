import React, { FC } from 'react';
import './GamesSelection.scss';
import SelectItemsPerPage from './SelectItemsPerPage';
import SelectCategories from './SelectCategories';
import SelectMerchants from './SelectMerchants';
import SelectSort from './SelectSort';
import SelectFavorite from './SelectFavorite';
import Search from './Search';

const GamesSelection: FC = () => {
  return (
    <div className="games-selection">
      <fieldset className="games-selection__options">
        <legend className="games-selection__options-legend">Options</legend>
        <div className="games-selection__filters">
          <div className="game-selection__filters-column">
            <SelectMerchants />
          </div>
          <div className="game-selection__filters-column">
            <SelectCategories />
          </div>
          <div className="game-selection__filters-column">
            <SelectFavorite />
          </div>
        </div>
        <div className="games-selection__display">
          <div className="game-selection__display-column">
            <SelectSort />
          </div>
          <div className="game-selection__display-column">
            <SelectItemsPerPage />
          </div>
          <div className="game-selection__display-column">
            <Search />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default GamesSelection;
