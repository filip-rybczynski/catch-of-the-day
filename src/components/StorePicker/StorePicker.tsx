// React
import React, { useState } from "react";
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

// utils
import { slugify } from "../../helpers";

// Styles
import "./StorePicker.styles.scss";
// import { SelectedStoreName } from "./components/SelectedStoreName";

export const StorePicker = (props: RouteComponentProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedStoreName, useActiveTabName] = useMainFormValue("");

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
