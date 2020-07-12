import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from 'store/types';
import { CategoriesArray } from 'categories/types';
import { setCategoriesFilter } from 'gamesList/actions';

const SelectCategories: FC = () => {
  const dispatch = useDispatch();
  const labelId = 'filter-by-categories';

  const { selectedCategories, allCategories } = useSelector<
    AppState,
    {
      selectedCategories: CategoriesArray;
      allCategories: CategoriesArray;
    }
  >(({ gamesList, categories }) => ({
    selectedCategories: categories.filter(category =>
      gamesList.filter.byCategories.includes(category.id)
    ),
    allCategories: categories,
  }));

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" id={labelId}>
        Filter by Categories
      </InputLabel>
      <Select
        multiple={true}
        value={selectedCategories.map(selected => selected.id)}
        labelId={labelId}
        onChange={event => {
          dispatch(
            setCategoriesFilter({ categories: event.target.value as string[] })
          );
        }}
        renderValue={selected => (
          <div className="games-selection__select-selected">
            {(selected as string[]).map((_, i) => (
              <span
                key={selectedCategories[i].id}
                className="games-selection__select-selected-item"
              >
                {selectedCategories[i].name}
              </span>
            ))}
          </div>
        )}
      >
        {allCategories.map(category => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectCategories;
