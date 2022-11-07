// React
import PropTypes from "prop-types";

// types
import { SelectOptionsProps } from "./SelectOptions.interface";

// utils
import { splitAndCapitalize } from "../../../../../helpers";

export const SelectOptions = ({
  optionArray,
  messageIfNone = "No options available",
}: SelectOptionsProps) => {
  const optionsList = [
    <option key="0" value="">
      {" "}
      -- Select --{" "}
    </option>,
  ];

  if (optionArray.length === 0)
    optionsList.push(
      <option key="1" value="">
        {messageIfNone}
      </option>
    );
  else
    optionsList.push(
      ...optionArray.map((option, i) => (
        <option key={i + option} value={option}>
          {splitAndCapitalize(option)}
        </option>
      ))
    );

  return <>{optionsList}</>;
};

SelectOptions.propTypes = {
  optionArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  messageIfNone: PropTypes.string.isRequired,
};