import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from 'store/types';
import { SortValue, GamesSort } from 'games/types';
import { setSort } from 'games/actions';

const SelectSort: FC = () => {
  const dispatch = useDispatch();
  const labelId = 'select-sort';

  const { current, options } = useSelector<
    AppState,
    {
      current: SortValue;
      options: GamesSort[];
    }
  >(({ games }) => ({
    current: games.currentSort,
    options: games.sort,
  }));

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" id={labelId}>
        Sort
      </InputLabel>
      <Select
        labelId={labelId}
        onChange={event => {
          dispatch(setSort(event.target.value as SortValue));
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
