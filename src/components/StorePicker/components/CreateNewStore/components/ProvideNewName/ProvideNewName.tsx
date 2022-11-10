// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { ProvideNewNameProps } from "./ProvideNewName.interface";

// Styles
import "./ProvideNewName.styles.scss";

export const ProvideNewName = ({ setStoreName }: ProvideNewNameProps) => {
  const [inputName, setInputName] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    setStoreName(inputName);
  }, [inputName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newEntry = e.currentTarget.value;

    if (newEntry !== "" && !/^[a-zA-Z\s]+$/.test(newEntry)) {
      setInputError("Only letters are allowed in store names!");
      return;
    }

    setInputName(newEntry);

    const words = newEntry.split(" ").filter((str) => str !== "");

    if (words.length > 2 && newEntry.slice(-1) === " ") { // user can continue typing the third word until he enters a space character
      setInputError("Name can't be longer than 3 words!");
      setInputName(words.slice(0, 3).join(" "));
      return;
    }

    setInputError("");
  };

  return (
    <section className="provide-name">
      <h3 className="provide-name__header">
        Provide a new name for your store
      </h3>
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
          {inputError ? (
            <span id="error" className="provide-name__error-message">
              {inputError}
            </span>
          ) : (
            ""
          )}
    </section>
  );
};

ProvideNewName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};
