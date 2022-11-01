// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { SelectExistingStoreProps } from "./SelectExistingStore.interface";
import { FilterOptions } from "./types";

// Hooks
import { useExistingStores } from "./hooks/useExistingStores";

// Material UI
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export const SelectExistingStore = ({
  updateSelectedName,
  isActive,
}: SelectExistingStoreProps) => {
  const [selectValue, setSelectValue] = useState("");
  const [storeFilter, setStoreFilter] = useState<FilterOptions>("");
  const [existingStores, filterExistingStores] = useExistingStores();

  useEffect(() => {
    filterExistingStores(storeFilter);
  }, [storeFilter]);

  updateSelectedName(selectValue, isActive);

  const capitalize = (storeName: string) => {
    return storeName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSelectValue(e.target.value);
  };

  return (
    <>
      <TextField
        id="outlined-select-store-name"
        select
        label="Existing store"
        value={selectValue}
        helperText="Please select an existing store"
        onChange={handleSelect}
      >
        {existingStores.length !== 0 ? ( //!TODO - extract component?
          [
            <MenuItem key={0} value="">
              --Select--
            </MenuItem>,
            ...existingStores.map((store) => (
              <MenuItem key={store} value={store}>
                {capitalize(store)}
              </MenuItem>
            )),
          ]
        ) : (
          <MenuItem value="">Apologies, no existing stores available!</MenuItem>
        )}
      </TextField>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Owner status</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          row
          value={storeFilter}
          defaultValue=""
          onChange={(e) => setStoreFilter(e.target.value as FilterOptions)}
        >
          <FormControlLabel value="owned" control={<Radio />} label="Owned" />
          {/* It's not possible to add a store to the Firebase database without an owner (to avoid cluttering the database), but some unowned stores are left in the Firebase database for the purpose of this demo */}
          <FormControlLabel
            value="unowned"
            control={<Radio />}
            label="Unowned"
          />
          <FormControlLabel value="" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>
    </>
  );
};

SelectExistingStore.propTypes = {
  updateSelectedName: PropTypes.func,
  isActive: PropTypes.bool,
};

export default SelectExistingStore;
