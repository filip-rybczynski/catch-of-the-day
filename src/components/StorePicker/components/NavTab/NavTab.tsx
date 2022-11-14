// React
import PropTypes from "prop-types";

// Types
import { NavTabProps } from "./NavTab.interface";

// Styles
import "./NavTab.styles.scss";

export const NavTab = ({
  index,
  activeTab,
  mainClassName,
  tabName,
  clickHandler,
}: NavTabProps) => {
  const isActive = index === activeTab ? "active" : "";
  return (
    <button
      type="button"
      className={`nav-button ${mainClassName} ${isActive}`}
      onClick={() => {
        clickHandler(index);
      }}
    >
      {tabName}
    </button>
  );
};

NavTab.propTypes = {
  index: PropTypes.number.isRequired,
  activeTab: PropTypes.number.isRequired,
  mainClassName: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
