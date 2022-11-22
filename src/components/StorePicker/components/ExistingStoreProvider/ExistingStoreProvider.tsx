// React
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

// Firebase
import { appDB } from "../../../../firebase";

// Types
import { FetchedStores } from "../../types";

// create context
export const ExistingStoreContext = createContext<FetchedStores>({});

// Context provider component
export const ExistingStoreProvider: FC<PropsWithChildren> = (props) => {
  const [existingStores, setExistingStores] = useState<FetchedStores>({});

  // Fetching object of existing stores from Firebase DB (and listening for subsequent updates)
  useEffect(() => {
    const dataBaseRef = appDB.ref();

    dataBaseRef.on(
      "value",
      (snapshot) => {
        const stores = snapshot.val();

        setExistingStores(stores);
      },
      (errorObject) => console.log("The read failed: " + errorObject.name)
    );

    return () => dataBaseRef.off("value"); // cleanup: removing listener
  }, []);

  return (
    <ExistingStoreContext.Provider value={existingStores}>
      {props.children}
    </ExistingStoreContext.Provider>
  );
};
