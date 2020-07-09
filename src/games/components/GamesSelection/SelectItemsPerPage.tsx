import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from 'store/types';
import { setItemsPerPage } from 'games/actions';

const SelectItemsPerPage: FC = () => {
  const dispatch = useDispatch();
  const labelId = 'select-items-per-page';

  const { current, options } = useSelector<
    AppState,
    {
      current: number;
      options: number[];
    }
  >(({ games }) => ({
    current: games.currentGamesPerPage,
    options: games.gamesPerPage,
  }));

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" id={labelId}>
        Games per page
      </InputLabel>
      <Select
        labelId={labelId}
        onChange={event => {
          dispatch(setItemsPerPage(+(event.target.value as string)));
        }}
        value={current}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectItemsPerPage;
