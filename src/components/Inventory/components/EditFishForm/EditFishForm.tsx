// React
import React from "react";
import PropTypes from "prop-types";

// Types
import { EditFishFormProps } from "./EditFishForm.interface";
import { convertAvailability } from "../../../utils";

export const EditFishForm = ({
  fish,
  onEditFormChange,
  fishId,
  deleteFish,
}: EditFishFormProps) => {
  return (
    <div className="fish-edit" aria-label="Edit fish">
      <input
        type="text"
        name="name"
        aria-label="Fish name"
        value={fish.name}
        onChange={(e) => onEditFormChange(fishId, e)}
      />
      <input
        type="number"
        name="price"
        aria-label="Fish price"
        value={fish.price}
        onChange={(e) => onEditFormChange(fishId, e)}
      />
      <select
        name="isAvailable"
        aria-label="Fish availability"
        value={convertAvailability(fish.isAvailable)}
        onChange={(e) => onEditFormChange(fishId, e)}
      >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea
        name="desc"
        aria-label="Fish description"
        value={fish.desc}
        onChange={(e) => onEditFormChange(fishId, e)}
      />
      <input
        type="text"
        aria-label="Fish image url"
        name="imageUrl"
        value={fish.imageUrl}
        onChange={(e) => onEditFormChange(fishId, e)}
      />
      <button onClick={() => deleteFish(fishId)}>Remove fish</button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    isAvailable: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
  fishId: PropTypes.string.isRequired,
  onEditFormChange: PropTypes.func.isRequired,
  deleteFish: PropTypes.func.isRequired,
};
