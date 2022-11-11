// React
import { RouteComponentProps } from "react-router";

// assets
import deadFish from "./assets/dead-fish.png";

// styles
import "./NotFound.styles.scss";

export const NotFound = ({ history }: RouteComponentProps) => {
  return (
    <div className="not-found">
      <h2 className="not-found__message">Not Found!</h2>
      <img
        src={deadFish}
        alt="dead cartoon fish"
        className="not-found__image"
      />
      <button
        className="not-found__button"
        onClick={() => {
          history.push("/"); // Go to Store Picker
        }}
      >
        Go to store selection
      </button>
    </div>
  );
};
