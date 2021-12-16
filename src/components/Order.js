import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // calcTotalSum = (order) => {
  //   const fishesInOrder = Object.keys(order);

  //   if (fishesInOrder.length === 0) return;

  //   const totalSum = fishesInOrder.reduce((totalSum, fish) => {
  //     if (this.props.fishMenu[fish].available) {
  //       return (
  //         totalSum + this.props.order[fish] * this.props.fishMenu[fish].price
  //       );
  //     }
  //   }, 0);

  //   return <p>{formatPrice(totalSum)}</p>;
  // };

  renderOrderListItem = (key) => {
    const { fishMenu, order } = this.props;
    // First make sure the fishMenu actually contains anything
    if (Object.keys(fishMenu).length === 0) return null;
    const fish = fishMenu[key];
    const count = order[key];
    const isAvailable = fish && fish.isAvailable;

    if (isAvailable) {
      return (
        <li key={key}>
          {count} lbs {fish.name}
          {formatPrice(count * fish.price)}
          <button onClick={() => this.props.deleteOrderFish(key)}>&times;</button>
        </li>
      );
    } else
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : "fish"} is no longer available!
          <button onClick={() => this.props.deleteOrderFish(key)}>&times;</button>
        </li>
      );
  };

  render() {
    const { fishMenu, order } = this.props;
    const fishesInOrder = Object.keys(order);
    const totalPrice = fishesInOrder.reduce((prevSum, key) => {
      const fish = fishMenu[key];
      const count = order[key];
      const isAvailable = fish && fish.isAvailable; // to check if the fish hasn't been deleted in the meantime
      return isAvailable ? prevSum + count * fish.price : prevSum;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        {/* Below: if there are no fishes in the menu, order list shouldn't be generated - especially important if we're loading the order from localStorage, which would typically load faster than the fishMenu from firebase */}
        {Object.keys(fishMenu).length === 0 ? null : (
          <ul className="order">
            {fishesInOrder.map(this.renderOrderListItem)}
          </ul>
        )}
        <div className="total">
          Total:
          <strong>{formatPrice(totalPrice)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
