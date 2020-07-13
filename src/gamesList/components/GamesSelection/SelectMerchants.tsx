import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import { AppState } from 'store/types';
import { MerchantsArray } from 'data/merchants/types';
import { setMerchantsFilter } from 'gamesList/actions';

const SelectCategories: FC = () => {
  const dispatch = useDispatch();
  const labelId = 'filter-by-merchants';

  const { selectedMerchants, allMerchants } = useSelector<
    AppState,
    {
      selectedMerchants: MerchantsArray;
      allMerchants: MerchantsArray;
    }
  >(({ gamesList, merchants: merchantsNormalized }) => {
    const merchants = Object.values(merchantsNormalized);

    return {
      selectedMerchants: merchants.filter(merchant =>
        gamesList.filter.byMerchants.includes(merchant.id)
      ),
      allMerchants: merchants,
    };
  });

  return (
    <div className="games-selection__field">
      <InputLabel className="games-selection__title" id={labelId}>
        Filter by Merchants
      </InputLabel>
      <Select
        multiple={true}
        value={selectedMerchants.map(selected => selected.id)}
        labelId={labelId}
        onChange={event => {
          dispatch(
            setMerchantsFilter({ merchants: event.target.value as string[] })
          );
        }}
        renderValue={selected => (
          <div className="games-selection__select-selected">
            {(selected as string[]).map((_, i) => (
              <span
                key={selectedMerchants[i].id}
                className="games-selection__select-selected-item"
              >
                {selectedMerchants[i].name}
              </span>
            ))}
          </div>
        )}
      >
        {allMerchants.map(merchant => (
          <MenuItem key={merchant.id} value={merchant.id}>
            {merchant.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectCategories;
