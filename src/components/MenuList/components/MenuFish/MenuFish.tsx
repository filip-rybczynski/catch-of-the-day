// React
import React from "react";
import PropTypes from "prop-types";

// types
import { MenuFishProps } from "./MenuFish.interface";

// utils
import { formatPrice } from "../../../../helpers";

export const MenuFish = ({ addToOrder, index, details }: MenuFishProps) => {
  const handleClick = () => {
    addToOrder(index);
  };

  const { imageUrl, name, price, desc, isAvailable } = details;

  return (
    <li className="menu-fish">
      <img src={imageUrl} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p>
      <button disabled={!isAvailable} onClick={handleClick}>
        {isAvailable ? "Add to order" : "SOLD OUT!"}
      </button>
    </li>
  );
};

MenuFish.propTypes = {
  details: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
  }),
  addToOrder: PropTypes.func.isRequired,
};
