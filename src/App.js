import React from "react";
import Header from "./components/Header";
import Order from "./components/Order";
import Inventory from "./components/Inventory";
import sampleFishes from "./sample-fishes";
import Fish from "./components/Fish";
import base from "./base";

class App extends React.Component {
  state = {
    fishMenu: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(`${params.storeId}-order`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      })
      
    }
    this.ref = base.syncState(`${params.storeId}/fishMenu`, { // forward slash used to go deeper into objects
      context: this,
      state: 'fishMenu'
    }); 
  }

  componentDidUpdate() {
    const { params } = this.props.match;
      localStorage.setItem(`${params.storeId}-order`, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref); // to stop listening for updates
  }

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

  onEditFormChange = (fishId, e) => {
    const {value, name} = e.currentTarget;

    const newFishMenu = {...this.state.fishMenu}

    if (name === "isAvailable") {
      newFishMenu[fishId][name] = value === 'available' ? true : false;
    } else {
      newFishMenu[fishId][name] = value;
    }

    this.setState({
      fishMenu: newFishMenu,
    })
  }

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
  //         newFish.isAvailable = (value === "available" ? true : false);
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
        <Order fishMenu={fishMenu} order={order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
          fishMenu={fishMenu}
          onEditFormChange={this.onEditFormChange}
        />
      </div>
    );
  }
}

export default App;
