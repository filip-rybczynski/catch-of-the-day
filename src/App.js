import React from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";

class App extends React.Component {
  state = {
    fishMenu: {},
    order: {},
  };

  addFish = (fish) => {
    const fishMenu = { ...this.state.fishMenu };

    fishMenu[`fish${Date.now()}`] = fish;

    this.setState({
      fishMenu, // can be used instead of fishMenu: fishMenu
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
    const { fishMenu } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
