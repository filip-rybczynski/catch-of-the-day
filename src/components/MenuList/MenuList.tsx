// React
import React from "react";
import PropTypes from "prop-types";

// Components
import Fish from "../Fish";

// Types
import { MenuListProps } from "./MenuList.interface";

export const MenuList = ({ fishMenu, addToOrder }: MenuListProps) => {
  return (
    <ul className="fishes">
      {Object.keys(fishMenu).map((key) => (
        <Fish
          key={key}
          details={fishMenu[key]}
          index={key}
          addToOrder={addToOrder}
        />
      ))}
    </ul>
  );
};

MenuList.propTypes = {
    fishMenu: PropTypes.object,
    addToOrder: PropTypes.func,
}
