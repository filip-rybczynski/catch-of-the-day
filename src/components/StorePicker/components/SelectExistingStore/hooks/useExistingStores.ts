// React
import { useState, useEffect } from "react";

// Types
import { FilterOptions } from "../types";

// Firebase
import { appDB } from "../../../../../firebase";

interface Store {
  owner?: string;
}

interface FetchedStores {
  [key: string]: Store;
}

export const useExistingStores = (): [string[], (f: FilterOptions) => void] => {
  const dataBaseRef = appDB.ref();
  const [fetchedStores, setFetchedStores] = useState<FetchedStores>({});
  const [storeNames, setStoreNames] = useState<string[]>([]);

  useEffect(() => {
    dataBaseRef.once("value", (snapshot) => {
      const stores = snapshot.val();

      setFetchedStores(stores);
      setStoreNames(Object.keys(stores));
    });
  }, []);

  const filterStores = (filter?: FilterOptions) => {
    let updatedStoreNames = Object.keys(fetchedStores);

    if (filter) {
      const getOwned = filter === "owned";

      updatedStoreNames = updatedStoreNames.filter(
        (store) =>
          (fetchedStores[store] as Store).hasOwnProperty("owner") === getOwned
      );
    }
    setStoreNames(updatedStoreNames);
  };

  return [storeNames, filterStores];
};
