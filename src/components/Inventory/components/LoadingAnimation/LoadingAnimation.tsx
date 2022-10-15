import React from "react";

import "./loading-animation.scss";

export const LoadingAnimation = () => {
  return (
    <div className="loading">
      <span className="loading__spinner"></span>
      <span className="loading__text">Loading</span>
    </div>
  );
}