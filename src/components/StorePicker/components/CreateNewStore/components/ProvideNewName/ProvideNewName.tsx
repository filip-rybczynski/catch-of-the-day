// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { ProvideNewNameProps } from "./ProvideNewName.interface";

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
    <div className="name-input">
      <label htmlFor="new-store-input" className="name-input__label">
        New store name
      </label>
      <input
        type="text"
        id="new-store-input"
        className="name-input__field"
        name="new-name"
        value={inputName}
        onChange={handleChange}
      />
      {inputError ? (
        <label htmlFor="new-store-input" className="name-input__error-label">
          {inputError}
        </label>
      ) : (
        ""
      )}
    </div>
  );
};

ProvideNewName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};
