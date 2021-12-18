import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 },
    };

    if (isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  // setting count as key allows us to have separate elements for two count values at the same time - one entering, the other exiting
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
              {formatPrice(count * fish.price)}
              <button onClick={() => this.props.deleteOrderFish(key)}>
                &times;
              </button>
            </span>
          </li>
        </CSSTransition>
      );
    } else
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry, {fish ? fish.name : "fish"} is no longer available!
            <button onClick={() => this.props.deleteOrderFish(key)}>
              &times;
            </button>
          </li>
        </CSSTransition>
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
          // component property used to indicate what component should be rendered out in the end
          <TransitionGroup component="ul" className="order">
            {fishesInOrder.map(this.renderOrderListItem)}
          </TransitionGroup>
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
