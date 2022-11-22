// React
import React from "react";
import PropTypes from "prop-types";

// Types
import { ErrorMessagesProps } from "./ErrorMessages.interface";

export const ErrorMessages = ({
  inputErrors,
  inputId,
  errorClassName,
}: ErrorMessagesProps) => {
  if (!inputErrors.length) return <></>;

  return (
    <>
      {inputErrors.map((error) => (
        <label htmlFor={inputId} className={errorClassName} key={error}>
          {error}
        </label>
      ))}
    </>
  );
};

ErrorMessages.propTypes = {
  inputErrors: PropTypes.arrayOf(PropTypes.string).isRequired,
  inputId: PropTypes.string.isRequired,
  errorClassName: PropTypes.string.isRequired,
};
