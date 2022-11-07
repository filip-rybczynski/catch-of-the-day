// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { SelectExistingStoreProps } from "./SelectExistingStore.interface";
import { FilterOptions } from "./types";

// Components
import { SelectOptions } from "./StoreDropdown/SelectOptions";

// Hooks
import { useExistingStores } from "./hooks/useExistingStores";
import { splitAndCapitalize } from "../../../../helpers";


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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setSelectValue(splitAndCapitalize(e.target.value));
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    setStoreFilter(e.target.value as FilterOptions);
  };

  return (
    <div>
      <label htmlFor="existing-stores">Choose existing store from list</label>
      <select id="existing-stores" value={selectValue} onChange={handleSelect}>
        <SelectOptions
          optionArray={existingStores}
          messageIfNone="Apologies, no existing stores available!"
        />
      </select>
      <fieldset className="existing-names__filter">
        <legend>Filter by ownership</legend>
        <label>
          <input
            type="radio"
            name="store-ownership"
            value="owned"
            checked={storeFilter === "owned"}
            onChange={onFilterChange}
          />
          Owned
        </label>
        {/* It's not possible to add a store to the Firebase database without an owner (otherwise the database could easily get cluttered), but some unowned stores are left in the Firebase database for the purpose of this demo */}
        <label>
          <input
            type="radio"
            name="store-ownership"
            value="unowned"
            checked={storeFilter === "unowned"}
            onChange={onFilterChange}
          />
          Unowned
        </label>
        <label>
          <input
            type="radio"
            name="store-ownership"
            value=""
            checked={storeFilter === ""}
            onChange={onFilterChange}
          />
          All
        </label>
      </fieldset>
    </ div>
  );
};

SelectExistingStore.propTypes = {
  updateSelectedName: PropTypes.func,
  isActive: PropTypes.bool,
};

export default SelectExistingStore;
