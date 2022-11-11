// assets
import deadFish from "./assets/dead-fish.png";

// styles
import "./NotFound.styles.scss";


export const NotFound = () => {

  return (
    <div className="not-found">
      <h2 className="not-found__message">Not Found!!</h2>
      <img
        src={deadFish}
        alt="dead cartoon fish"
        className="not-found__image"
      />
    </div>
  );
};
