// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { SelectExistingStoreProps } from "./SelectExistingStore.interface";
import { FilterOptions } from "./types";
import { Store } from "../../types";

// Components
import { SelectOptions } from "./StoreDropdown/SelectOptions";
import { FilterInputs } from "./FilterInputs";

// utils
import { splitAndCapitalize } from "../../../../helpers";

// variables
import { FILTER_OPTIONS } from "./constants";

// styles
import "./SelectExistingStore.styles.scss";

export const SelectExistingStore = ({
  updateSelectedName,
  isActive,
  existingStores = {},
}: SelectExistingStoreProps) => {
  const [selectValue, setSelectValue] = useState("");
  const [storeFilter, setStoreFilter] = useState<FilterOptions>("");
  const [storeList, setStoreList] = useState(Object.keys(existingStores));

  // Update store list for selection whenever 1. existing store list (fetched) changes, or 2. filter gets updated
  useEffect(() => {
    let updatedStoreNames = Object.keys(existingStores);

    if (storeFilter) {
      const getOwned = storeFilter === "owned";

      updatedStoreNames = updatedStoreNames.filter(
        (store) =>
          (existingStores[store] as Store).hasOwnProperty("owner") === getOwned
      );
    }

    setStoreList(updatedStoreNames);
  }, [storeFilter, existingStores]);

  updateSelectedName(splitAndCapitalize(selectValue), isActive);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setSelectValue(e.target.value);
  };

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreFilter(e.target.value as FilterOptions);
  };

  return (
    <section className="existing-stores">
      <h2 className="existing-stores__header">Visit existing store</h2>
      <div className="existing-stores__flex">
        <div className="existing-stores__selection">
          <label
            htmlFor="existing-stores"
            className="existing-stores__select-label"
          >
            Select store
          </label>
          <select
            id="existing-stores"
            value={selectValue}
            onChange={handleSelect}
            className="existing-stores__select"
          >
            <SelectOptions
              optionArray={storeList}
              messageIfNone="Apologies, no existing stores available!"
            />
          </select>
        </div>
        <fieldset className="existing-stores__filter filter-options">
          <legend className="filter-options__legend">
            Filter by ownership
          </legend>
          <FilterInputs
            onChange={onFilterChange}
            currentFilter={storeFilter}
            // Re: unowned option - It's not possible to add a store to the Firebase database without an owner (otherwise the database could easily get cluttered), but some unowned stores are left in the Firebase database for the purpose of this demo
            values={FILTER_OPTIONS}
            labelClassName={"filter-options__label"}
          />
        </fieldset>
      </div>
    </section>
  );
};

SelectExistingStore.propTypes = {
  updateSelectedName: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  existingStores: PropTypes.object
};

export default SelectExistingStore;
