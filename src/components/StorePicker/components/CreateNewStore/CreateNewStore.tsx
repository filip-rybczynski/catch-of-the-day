// React
import { useState } from "react";
import PropTypes from "prop-types";

// Types
import { CreateNewStoreProps } from "./CreateNewStore.interface";

// Components
import { GenerateRandomName, ProvideNewName } from "./components";

export const CreateNewStore = ({
  updateSelectedName,
  isActive,
}: CreateNewStoreProps) => {
  const [newStoreName, setNewStoreName] = useState("");

  updateSelectedName(newStoreName, isActive);
  return (
    <>
      <fieldset className="store-creator">
        <legend className="store-creator__legend">Choose a name for your store</legend>
        <ProvideNewName
          setStoreName={setNewStoreName}
        />
        <span className="store-creator__divider">OR</span>
        <GenerateRandomName
          setStoreName={setNewStoreName}
        />
      </fieldset>
      <h2 className="store-creator__name">
      {newStoreName && `New store name: ${newStoreName}`}
      </h2>
    </>
  );
};

CreateNewStore.propTypes = {
  updateSelectedName: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
