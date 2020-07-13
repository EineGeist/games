import React, { FC, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, InputLabel } from '@material-ui/core';
import { throttle } from 'lodash';
import { AppState } from 'store/types';
import { setSearchQuery } from 'gamesList/actions';

export const Search: FC = () => {
  const dispatch = useDispatch();
  const textFieldId = 'search-game';

  const currentSearchQuery = useSelector<AppState, string>(
    ({ gamesList }) => gamesList.filter.bySearchQuery
  );

  const [currentValue, setCurrentValue] = useState(currentSearchQuery);
  const delayedQuery = useRef(
    throttle((query: string) => dispatch(setSearchQuery({ query })), 500)
  ).current;

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" htmlFor={textFieldId}>
        Search game
      </InputLabel>
      <TextField
        id={textFieldId}
        type="search"
        value={currentValue}
        onChange={event => {
          setCurrentValue(event.target.value);
          delayedQuery(event.target.value);
        }}
        placeholder="Type something"
      />
    </div>
  );
};

export default Search;
