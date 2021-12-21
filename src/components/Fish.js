import React from "react";
import PropTypes from "prop-types";

import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      isAvailable: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
    }),
    addToOrder: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.addToOrder(this.props.index);
  };

  render() {
    const { image, name, price, desc, isAvailable } = this.props.details;
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to order" : "SOLD OUT!"}
        </button>
      </li>
    );
  }
}

export default Fish;
