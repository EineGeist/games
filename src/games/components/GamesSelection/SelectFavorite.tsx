import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Checkbox } from '@material-ui/core';
import { AppState } from 'store/types';
import { toggleFavoriteFilter } from 'games/actions';

export interface SelectFavoriteProps {}

const SelectFavorite: FC<SelectFavoriteProps> = () => {
  const dispatch = useDispatch();
  const checkboxId = 'filter-by-favorite';

  const state = useSelector<AppState, boolean>(
    ({ games }) => games.filters.byFavorite
  );

  const hasFavorites = useSelector<AppState, boolean>(
    ({ favoriteGames }) => !!favoriteGames.list.length
  );

  if (!hasFavorites) return null;

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" htmlFor={checkboxId}>
        Filter by favorite
      </InputLabel>
      {/* Prevent checkbox growing */}
      <div>
        <Checkbox
          id={checkboxId}
          onChange={() => dispatch(toggleFavoriteFilter())}
          value={state}
        />
      </div>
    </div>
  );
};

export default SelectFavorite;
