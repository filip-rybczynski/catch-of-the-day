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
      <fieldset>
        <legend>Choose a name for your store</legend>
        <ProvideNewName
          setStoreName={setNewStoreName}
        />
        <span>OR</span>
        <GenerateRandomName
          setStoreName={setNewStoreName}
        />
      </fieldset>
      {newStoreName && `New store name: ${newStoreName}`}
    </>
  );
};

CreateNewStore.propTypes = {
  updateSelectedName: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
