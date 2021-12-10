import React from "react";
import Header from './components/Header';
import Order from './components/Order';
import Inventory from './components/Inventory';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market"/>
            </div>
            <Order />
            <Inventory />
        </div>
    );
  }
}

export default App;
