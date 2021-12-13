import React from "react";
import { formatPrice } from "../helpers";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calcTotalSum = (order) => {
    const fishesInOrder = Object.keys(order);

    if (fishesInOrder.length === 0) return;

    const totalSum = fishesInOrder.reduce((totalSum, fish) => {
      if (this.props.fishMenu[fish].available) {
        return (
          totalSum + this.props.order[fish] * this.props.fishMenu[fish].price
        );
      }
    }, 0);

    return <p>{formatPrice(totalSum)}</p>;
  };

  render() {
    const { fishMenu, order } = this.props;

    return (
      <React.Fragment>
        <div className="order">
          <ul>
            {Object.keys(order).map((fish) => {
              if (fishMenu[fish].available) {
                return (
                  <li key={fish}>
                    {fishMenu[fish].name}
                    ({order[fish]})
                    {formatPrice(order[fish] * fishMenu[fish].price)}
                  </li>
                );
              }
            })}
          </ul>

          {this.calcTotalSum(order)}
        </div>
      </React.Fragment>
    );
  }
}

export default Order;
