// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import { ErrorMessages } from "./ErrorMessages";

// Types
import { ProvideNewNameProps } from "./ProvideNewName.interface";
import { ErrorStrings } from "./types";

// Utils
import { validateInput } from "./utils/validateInput";

// Styles
import "./ProvideNewName.styles.scss";

export const ProvideNewName = ({ setStoreName }: ProvideNewNameProps) => {
  const [inputName, setInputName] = useState("");
  const [inputErrors, setInputErrors] = useState<ErrorStrings[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newEntry = e.currentTarget.value;

    setInputName(newEntry);
  };

  const handleConfirm = () => {
    const newErrors = validateInput(inputName);

    if (!newErrors.length) setStoreName(inputName.trim());
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
      <div className="provide-name__controls">
        <label htmlFor="new-store-input" className="provide-name__label">
          Store name
          <input
            type="text"
            id="new-store-input"
            className="provide-name__field"
            name="new-name"
            value={inputName}
            onChange={handleChange}
            aria-describedby="error"
          />
        </label>

        <button type="button" aria-label="clear input" onClick={handleClear} className="input-clear">
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
