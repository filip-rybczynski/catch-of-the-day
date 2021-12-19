import React from "react";
import PropTypes from "prop-types";

import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    fishMenu: PropTypes.object,
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    onEditFormChange: PropTypes.func,
    deleteFish: PropTypes.func,
  }

  render() {
    const { fishMenu, addFish, loadSampleFishes, onEditFormChange, deleteFish } =
      this.props;
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        {Object.keys(fishMenu).map((key) => (
          <EditFishForm
            key={key}
            fishId={key}
            fish={fishMenu[key]}
            onEditFormChange={onEditFormChange}
            deleteFish={deleteFish}
          />
        ))}
        <AddFishForm addFish={addFish} />
        <button onClick={loadSampleFishes}>Load Sample Fishes</button>
      </div>
    );
  }
}

export default Inventory;
