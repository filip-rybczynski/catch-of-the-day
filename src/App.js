import React from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import sampleFishes from "./sample-fishes";
import Fish from "./components/Fish";

class App extends React.Component {
  state = {
    fishMenu: {},
    order: {},
  };

  loadSampleFishes = () => {
    this.setState({
      fishMenu: sampleFishes,
    });
  };

  addFish = (fish) => {
    const fishMenu = { ...this.state.fishMenu };

    fishMenu[`fish${Date.now()}`] = fish;

    this.setState({
      fishMenu, // can be used instead of fishMenu: fishMenu
    });
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };

    order[key] = order[key] + 1 || 1;

    this.setState({
      order,
    });
  };

  // TODO After course is finished, re-write the code without refs
  //   addFish = (e) => {
  //     e.preventDefault();

  //     const formValues = [...e.target.elements].slice(0, -1);
  //     const newFish = {};

  //     formValues.forEach(element => {
  //       const {value, name, type} = element;
  //       if(type === "number") {
  //         newFish[name] = parseFloat(value);
  //       } else if (type === "select-one") {
  //         newFish.available = (value === "available" ? true : false);
  //     } else {
  //       newFish[name] = value;
  //     }

  //     const fishMenu = {...this.state.fishMenu};

  //     fishMenu[`fish${Date.now()}`] = newFish;

  //     this.setState({
  //       fishMenu: fishMenu,
  //     })
  //   }
  //     );
  // }

  render() {
    const { fishMenu, order } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishMenu).map((key) => (
              <Fish
                key={key}
                details={fishMenu[key]}
                index={key}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishMenu={fishMenu} order={order}/>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
