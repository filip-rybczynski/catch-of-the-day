// React
import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

// types
import { OrderProps } from "./Order.interface";

// utils
import { formatPrice } from "../../helpers";

export const Order = ({ fishMenu, order, deleteOrderFish }: OrderProps) => {
  // Rendering order item
  const renderOrderListItem = (key: string) => {
    const fish = fishMenu[key]; // get object with data associated with current fish/list item
    const count = order[key]; // get number of fishes
    const isAvailable = fish && fish.isAvailable; // make sure fish exists in menu AND is available (not sold out)

    // Options for the CSSTransition component
    const TRANSITION_OPTIONS = {
      classNames: "order",
      key,
      timeout: { enter: 250, exit: 250 },
    };

    if (isAvailable) {
      // Return list item with fish name, amount and price for said amount
      return (
        <CSSTransition {...TRANSITION_OPTIONS}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  // setting count as key allows us to have separate elements for two count values at the same time - new one entering, previous one exiting
                  key={count}
                  timeout={{ enter: 250, exit: 250 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name}
            </span>
            {formatPrice(count * fish.price)}
            <button onClick={() => deleteOrderFish(key)}>&times;</button>
          </li>
        </CSSTransition>
      );
    }
    // Return a message that fish is unavailable - either by being sold out or by being removed from the menu completely
    else
      return (
        <CSSTransition {...TRANSITION_OPTIONS}>
          <li key={key}>
            Sorry, {fish ? fish.name : "fish"} is no longer available!
            <button onClick={() => deleteOrderFish(key)}>&times;</button>
          </li>
        </CSSTransition>
      );
  };

  const fishesInOrder = Object.keys(order); // array of fish IDs in order

  const totalPrice = fishesInOrder.reduce((prevSum, key) => {
    const fish = fishMenu[key]; // get object with data associated with current fish/list item
    const count = order[key]; // get number of fishes
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
          {fishesInOrder.map(renderOrderListItem)}
        </TransitionGroup>
      )}
      <div className="total">
        Total:
        <strong>{formatPrice(totalPrice)}</strong>
      </div>
    </div>
  );
};

Order.propTypes = {
  fishMenu: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  deleteOrderFish: PropTypes.func.isRequired,
};
