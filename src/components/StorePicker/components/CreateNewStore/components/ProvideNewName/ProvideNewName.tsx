// React
import React, { createRef, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

// Components
import { ErrorMessages } from "./ErrorMessages";
import { ExistingStoreContext } from "../../../ExistingStoreProvider";

// Types
import { ProvideNewNameProps } from "./ProvideNewName.interface";
import { ErrorStrings } from "./types";

// Utils
import { validateInput } from "./utils";
import { capitalize } from "../../../../../../helpers";

// Styles
import "./ProvideNewName.styles.scss";

export const ProvideNewName = ({ setStoreName }: ProvideNewNameProps) => {
  const [inputName, setInputName] = useState("");
  const [inputErrors, setInputErrors] = useState<ErrorStrings[]>([]);

  const inputRef = createRef<HTMLInputElement>();

  useEffect(()=> {
    if (inputErrors.length) {
      inputRef.current && inputRef.current.focus(); 
    }
  }, [inputErrors, inputRef])

  // Array of store names (lowercase, hyphenated)
  const existingStores = Object.keys(useContext(ExistingStoreContext));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newEntry = e.currentTarget.value;

    setInputName(newEntry);
    setInputErrors([]);
  };

  const handleConfirm = () => {
    // remove multiple whitespaces to simplify validations
    const prunedInput = inputName.trim().replace(/\s\s+/g, " ");

    // Check if input triggers any validation errors
    const newErrors = validateInput(prunedInput, existingStores);

    if (!newErrors.length) { // only set new store name if there are no errors
      const capitalizedName = prunedInput.split(" ").map(capitalize).join(" "); // capitalize each word

      setStoreName(capitalizedName);
    }
    // if there are no errors, this will just reset errors
    setInputErrors(newErrors);

    return;
  };

  const handleClear = () => {
    setInputName("");
    setInputErrors([]);
  };

  return (
    <section className="provide-name">
      <h3 className="provide-name__header">
        Provide a new name for your store
      </h3>
      <p className="provide-name__instructions">
        Letters only, max 40 characters, no more than 3 words
      </p>
      <div className="provide-name__controls">
        <label htmlFor="new-store-input" className="provide-name__label">
          Store name
          <input
            type="text"
            id="new-store-input"
            className={`provide-name__field ${inputErrors.length ? "input-error" : "" }`}
            name="new-name"
            value={inputName}
            onChange={handleChange}
            ref={inputRef}
          />
        </label>

        <button
          type="button"
          aria-label="clear input"
          onClick={handleClear}
          className="input-clear"
        >
          Clear
        </button>
        <button
          type="button"
          aria-label="confirm name from input"
          onClick={handleConfirm}
          className="input-confirm"
        >
          Confirm
        </button>
      </div>
      <ErrorMessages
        inputErrors={inputErrors}
        inputId="new-store-input"
        errorClassName="provide-name__error-message"
      />
    </section>
  );
};

ProvideNewName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};
