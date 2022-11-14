// React
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// Types
import { SelectedStoreNameProps } from "./SelectedStoreName.interface";

// Styles
import "./SelectedStoreName.styles.scss";

export const SelectedStoreName = ({
  storeName,
  parentElClassName,
}: SelectedStoreNameProps) => {
  const TRANSITION_OPTIONS = {
    classNames: "selected-store",
    key: storeName,
    timeout: { enter: 250, exit: 250 },
  };

  return (
    <h2 className={parentElClassName}>
      Store name:{" "}
      <TransitionGroup component="span" className="selected-store">
        <CSSTransition {...TRANSITION_OPTIONS}>
          <span className={storeName ? "" : "none"}>{storeName || "none"}</span>
        </CSSTransition>
      </TransitionGroup>
    </h2>
  );
};

SelectedStoreName.propTypes = {
  storeName: PropTypes.string.isRequired,
};
