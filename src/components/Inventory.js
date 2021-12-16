import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";

class Inventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
