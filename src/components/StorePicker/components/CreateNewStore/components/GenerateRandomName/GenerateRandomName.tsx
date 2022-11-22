// React
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

// Components
import { ToggleButtonGroup } from "../../../ToggleButtonGroup";
import { ExistingStoreContext } from "../../../ExistingStoreProvider";

// Types
import { GenerateRandomNameProps } from "./GenerateRandomName.interface";
import { ButtonDetails } from "../../../ToggleButtonGroup/types";

// Utils
import { generateName } from "./utils";
import {checkForDuplicates} from "../../utils";

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

    // Array of store names (lowercase, hyphenated)
    const existingStores = Object.keys(useContext(ExistingStoreContext));

  useEffect(() => {
    setStoreName(generatedName);
  }, [generatedName]);

  const handleGenClick = () => {
    const newGenName = generateName(nameLength);

    if (
      checkForDuplicates(newGenName, existingStores) // returns truthy value (error string) if there's a duplicate
    ) handleGenClick(); // this is a project for demo purposes only - I'm not adding a safeguard here, chances are slim there will be a duplicate, let alone all names will be taken :) Otherwise, I'd add a counter to limit the amount of retries.

    setGeneratedName(newGenName);
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
