// React
import React from "react";
import PropTypes from "prop-types";

// Components
import { AuthButton } from "./components";

// Types
import { LoginProps } from "./Login.interface";

export const Login = ({ authFunction, claim = false, providers }: LoginProps) => {
  const header = claim ? "Inventory - Claim Store" : "Inventory - Login";

  const instruction = `Sign in to ${
    claim ? "claim the store as owner and" : ""
  } manage your store's
    inventory`;

  const buttonType = claim ? "Claim store" : "Log in";

  return (
    <nav className="login">
      <h2>{header}</h2>
      <p>{instruction}</p>
      {/* Login buttons for all providers */}
      {providers.map((provider) => (
        <AuthButton
          key={provider}
          buttonType={buttonType}
          provider={provider}
          authFunction={() => authFunction(provider, claim)}
        />
      ))}
      <p className="note">
        (<b>Note:</b> for this demo, each identity providers will be treated as a
        separate user/account)
      </p>
    </nav>
  );
};

Login.propTypes = {
  authFunction: PropTypes.func.isRequired,
  claim: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.string).isRequired
};
