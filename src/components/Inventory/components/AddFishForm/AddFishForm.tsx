// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Types
import { AddFishFormProps } from "./AddFishForm.interface";
import { FishData, FishFormChangeEvent } from "../../../../types";

// Functions
import { convertAvailability } from "../../../utils";
import { getUpdatedFishDetails } from "../../../../utils";

// Variables
import { DEFAULT_ADD_FISH_FORM_CONTENT } from "./constants";

export const AddFishForm = ({ addFish }: AddFishFormProps) => {
  // All details pertaining to the new fish
  const [fishDetails, setFishDetails] = useState<FishData>(
    DEFAULT_ADD_FISH_FORM_CONTENT
  );

  const handleInputChange = (
    e: FishFormChangeEvent
  ): void => {
    e.preventDefault();

    // get new object of fish details
    const updatedFishDetails = getUpdatedFishDetails(
      e.currentTarget,
      fishDetails
    );

    // update state
    setFishDetails(updatedFishDetails);
  };

  const createFish = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Add fish to menu
    addFish(fishDetails);

    // Reset form content
    setFishDetails(DEFAULT_ADD_FISH_FORM_CONTENT);
  };

  return (
    <form className="fish-edit" aria-label="Add new fish" onSubmit={createFish}>
      <input
        name="name"
        type="text"
        placeholder="Name"
        aria-label="Name"
        value={fishDetails.name}
        onChange={handleInputChange}
        required
        // className="add-fish__form-item add-fish__form-item--input" // TODO styles in component folder
      />
      <input
        name="price"
        type="number"
        placeholder="Price (in cents)"
        aria-label="Price in cents"
        value={fishDetails.price || ""} // to account for 0
        onChange={handleInputChange}
        required
        // className="add-fish__form-item" // TODO styles in component folder

      />
      <select
        name="isAvailable"
        aria-label="Fish availability"
        value={convertAvailability(fishDetails.isAvailable)} // function converts from boolean to the corresponding value string
        onChange={handleInputChange}
        required
        // className="add-fish__form-item" // TODO styles in component folder

      >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea
        name="desc"
        placeholder="Description"
        aria-label="Description"
        value={fishDetails.desc}
        onChange={handleInputChange}
        required
        // className="add-fish__form-item" // TODO styles in component folder

      />
      <input
        name="imageUrl"
        type="text"
        placeholder="Image url"
        aria-label="Image url"
        value={fishDetails.imageUrl}
        onChange={handleInputChange}
        required
        // className="add-fish__form-item" // TODO styles in component folder

      />
      <button type="submit"
      className="add-fish__button">+ Add Fish </button>
    </form>
  );
};

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired,
};
