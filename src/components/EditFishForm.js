import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
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
  }

  render() {
    const { fish, onEditFormChange, fishId, deleteFish } = this.props;
    return (
      <div className="fish-edit">
        <input
          type="text"
          name="name"
          value={fish.name}
          onChange={(e) => onEditFormChange(fishId, e)}
        />
        <input
          type="number"
          name="price"
          value={fish.price}
          onChange={(e) => onEditFormChange(fishId, e)}
        />
        <select
          type="text"
          name="isAvailable"
          value={fish.isAvailable ? "available" : "unavailable"}
          onChange={(e) => onEditFormChange(fishId, e)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          onChange={(e) => onEditFormChange(fishId, e)}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          onChange={(e) => onEditFormChange(fishId, e)}
        />
        <button onClick={() => deleteFish(fishId)}>Remove fish</button>
      </div>
    );
  }
}

export default EditFishForm;
