// React
import { useState } from "react";
import PropTypes from "prop-types";

// Types
import { CreateNewStoreProps } from "./CreateNewStore.interface";

// Components
import { GenerateRandomName, ProvideNewName } from "./components";

// Styles
import "./CreateNewStore.styles.scss";

export const CreateNewStore = ({
  updateSelectedName,
  isActive,
}: CreateNewStoreProps) => {
  const [newStoreName, setNewStoreName] = useState("");

  updateSelectedName(newStoreName, isActive);

  return (
      <section className="store-creator">
        <h2 className="store-creator__header">Create new store</h2>

        <ProvideNewName
          setStoreName={setNewStoreName}
        />
        <div className="store-creator__or">OR</div>
        <GenerateRandomName
          setStoreName={setNewStoreName}
        />
      </section>

  );
};

CreateNewStore.propTypes = {
  updateSelectedName: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
