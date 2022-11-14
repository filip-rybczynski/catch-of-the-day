// React
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

// Components
import { ToggleButtonGroup } from "../../../ToggleButtonGroup";

// Types
import { GenerateRandomNameProps } from "./GenerateRandomName.interface";
import { ButtonDetails } from "../../../ToggleButtonGroup/types";

// Utils
import { generateName } from "./utils";

// styles
import "./GenerateRandomName.styles.scss";

type WordCountOptions = 2 | 3;

const wordCountButtons: ButtonDetails<WordCountOptions>[] = [
  { val: 2, label: "2 words" },
  { val: 3, label: "3 words" },
];

export const GenerateRandomName = ({
  setStoreName,
}: GenerateRandomNameProps) => {
  const [generatedName, setGeneratedName] = useState("");
  const [nameLength, setNameLength] = useState<WordCountOptions>(2);

  useEffect(() => {
    setStoreName(generatedName);
  }, [generatedName]);

  const handleGenClick = () => {
    setGeneratedName(generateName(nameLength));
  };

  return (
    <section className="name-generator">
      <h3 className="name-generator__header">
        Click the button to generate a random name!
      </h3>
      <button
        className="name-generator__button"
        type="button"
        onClick={handleGenClick}
      >
        Generate name
      </button>
      <fieldset className="name-generator__length-toggle length-toggle">
        <legend className="length-toggle__legend">Name length</legend>
        <ToggleButtonGroup
          toggleButtons={wordCountButtons}
          valueHandler={setNameLength}
          mainButtonClass="length-toggle__button"
        />
      </fieldset>
    </section>
  );
};

GenerateRandomName.propTypes = {
  setStoreName: PropTypes.func.isRequired,
};
