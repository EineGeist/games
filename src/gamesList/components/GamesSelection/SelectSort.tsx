import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from 'store/types';
import { SortOption, SORT_OPTIONS } from 'gamesList/types';
import { setGamesSort } from 'gamesList/actions';

const SelectSort: FC = () => {
  const dispatch = useDispatch();
  const labelId = 'select-sort';

  const { current, options } = useSelector<
    AppState,
    {
      current: SORT_OPTIONS;
      options: SortOption[];
    }
  >(({ gamesList }) => ({
    current: gamesList.sort,
    options: gamesList.sortOptions,
  }));

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" id={labelId}>
        Sort
      </InputLabel>
      <Select
        labelId={labelId}
        onChange={event => {
          dispatch(setGamesSort({ sort: event.target.value as SORT_OPTIONS }));
        }}
        value={current}
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectSort;
