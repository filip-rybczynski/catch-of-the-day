// React
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import PropTypes from "prop-types";

// Componenets
import {
  FormTab,
  NavTab,
  CreateNewStore,
  SelectExistingStore,
  SelectedStoreName
} from "./components";

// Hooks
import { useMainFormValue } from "./hooks";

// Types
import { FetchedStores } from "./types";

// Firebase
import { appDB } from "../../firebase";

// utils
import { slugify } from "../../helpers";

// Styles
import "./StorePicker.styles.scss";

export const StorePicker = (props: RouteComponentProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStoreName, useActiveTabName] = useMainFormValue("");
  const [existingStores, setExistingStores] = useState<FetchedStores>();
  
  // Fetching object of existing stores from Firebase DB
  useEffect(() => {
    const dataBaseRef = appDB.ref();

    dataBaseRef.once("value", (snapshot) => {
      const stores = snapshot.val();

      setExistingStores(stores);
    }); // once() adds a listener, reads the value once, and then removes listener - no cleanup function required
  }, []);

  const goToStore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedStoreName) return;

    props.history.push(`/store/${slugify(selectedStoreName)}`);
  };

  const FORM_TAB_NAMES = ["Existing Store", "New Store"];

  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h1 className="store-selector__header">Select A Store</h1>
      <nav>
        {FORM_TAB_NAMES.map((name, index) => (
          <NavTab
            key={name + index.toString()}
            index={index}
            activeTab={activeTab}
            tabName={name}
            mainClassName={"store-selector__nav-button"}
            clickHandler={(i) => setActiveTab(i)}
          />
        ))}
      </nav>
      <FormTab
        index={0}
        activeTab={activeTab}
        render={(isActive) => (
          <SelectExistingStore
            updateSelectedName={useActiveTabName}
            isActive={isActive}
            existingStores={existingStores}
          />
        )}
      />
      <FormTab
        index={1}
        activeTab={activeTab}
        render={(isActive) => (
          <CreateNewStore
            updateSelectedName={useActiveTabName}
            isActive={isActive}
          />
        )}
      />
      <SelectedStoreName
        storeName={selectedStoreName}
        parentElClassName="store-selector__current-selection"
      />
      <button
        type="submit"
        className="store-selector__submit-button"
        disabled={!selectedStoreName}
      >
        {selectedStoreName ? `Go to store ` : "Please choose a store to visit"}
      </button>
    </form>
  );
};

StorePicker.propTypes = {
  history: PropTypes.object.isRequired,
};
