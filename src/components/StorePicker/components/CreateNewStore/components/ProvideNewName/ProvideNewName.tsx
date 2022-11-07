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

    const newValue = e.currentTarget.value;
    setInputName(newValue);

    const words = newValue.split(" ");

    if (words.length > 3) {
      setInputError("Too long! Max 3 words");
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
