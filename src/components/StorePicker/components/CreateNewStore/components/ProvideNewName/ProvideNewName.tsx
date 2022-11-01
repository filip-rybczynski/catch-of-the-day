// React
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Types
import { ProvideNewNameProps } from "./ProvideNewName.interface";

//Material UI
import { TextField } from "@mui/material";

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
    <TextField
      id="outlined-input-new-name"
      error={!!inputError}
      label="New store name"
      value={inputName}
      helperText={inputError || "Please provide a name for your store"}
      onChange={handleChange}
    ></TextField>
  );
};

ProvideNewName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};
