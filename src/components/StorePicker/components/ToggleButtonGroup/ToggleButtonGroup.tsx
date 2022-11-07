//React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Types
import { ToggleButtonGroupProps } from "./ToggleButtonGroup.interface";
import { ButtonDetails, ButtonVals } from "./types";

// Styles
import "./ToggleButtonGroup.styles.scss";

export const ToggleButtonGroup = <T extends ButtonVals>({
  toggleButtons,
  valueHandler,
  mainButtonClass = "toggle-button",
}: ToggleButtonGroupProps<T>) => {
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(
    null
  );

  const handleClick = (val: T, i: number) => {
    valueHandler(val);

    if (activeButtonIndex === i) {
      setActiveButtonIndex(null);
    } else {
      setActiveButtonIndex(i);
    }
  };

  return (
    <>
      {toggleButtons.map(({ val, label }: ButtonDetails<T>, i) => (
        <button
          key={i + label}
          type="button"
          onClick={handleClick.bind(null, val, i)}
          className={`${mainButtonClass} ${
            activeButtonIndex === i ? "active" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </>
  );
};

ToggleButtonGroup.propTypes = {
  toggleButtons: PropTypes.arrayOf(
    PropTypes.shape({
      val: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      label: PropTypes.string,
    })
  ).isRequired,
  valueHandler: PropTypes.func.isRequired,
  mainButtonClass: PropTypes.string,
};
