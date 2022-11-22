import React, {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { appDB } from "../../../../firebase";
import { FetchedStores } from "../../types";

export const ExistingStoreContext = createContext<FetchedStores>({});

export const ExistingStoreProvider: FC<PropsWithChildren> = (props) => {
  const [existingStores, setExistingStores] = useState<FetchedStores>({});

  // Fetching object of existing stores from Firebase DB
  useEffect(() => {
    const dataBaseRef = appDB.ref();

    dataBaseRef.once("value", (snapshot) => {
      const stores = snapshot.val();

      setExistingStores(stores);
    }); // once() adds a listener, reads the value once, and then removes listener - no cleanup function required
  }, []);

  return (
    <ExistingStoreContext.Provider value={existingStores}>
      {props.children}
    </ExistingStoreContext.Provider>
  );
};
