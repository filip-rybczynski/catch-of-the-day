// React
import React from "react";
import PropTypes from "prop-types";
// Types
import { AuthButtonProps } from "./AuthButton.interface";

export const AuthButton = ({
  buttonType,
  provider,
  authFunction,
}: AuthButtonProps) => {
  return (
    <button
      className={provider.toLowerCase()}
      onClick={() => {
        authFunction(provider);
      }}
    >
      {buttonType} using {provider}
    </button>
  );
};

AuthButton.propTypes = {
  authFunction: PropTypes.func.isRequired,
  buttonType: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
};
