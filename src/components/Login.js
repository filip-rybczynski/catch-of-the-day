import React from "react";
import PropTypes from "prop-types";

const Login = ({ authenticate, claim }) => {
  return (
    <nav className="login">
      <h2>Inventory {claim && "- first"} Login</h2>
      <p>
        Sign in to {claim && "claim the store as owner and"} manage your store's
        inventory
      </p>
      <button
        className="github"
        onClick={() => {
          authenticate("Github", claim);
        }}
      >
        {claim ? "Claim store via" : "Log in with"} Github
      </button>
      <button
        className="facebook"
        onClick={() => {
          authenticate("Facebook", claim);
        }}
      >
        {claim ? "Claim store via" : "Log in with"} Facebook
      </button>
      <p>
        (For this demo, usint each identity provider will be treated as a
        different user/account)
      </p>
    </nav>
  );
};

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  claim: PropTypes.bool.isRequired,
};

export default Login;
