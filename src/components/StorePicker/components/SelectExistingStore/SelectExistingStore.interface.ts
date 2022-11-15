import { UpdateMainFormValue } from "../../types/UpdateMainFormValue.type";

interface Store {
  owner?: string;
}

interface FetchedStores {
  [key: string]: Store;
}

export interface SelectExistingStoreProps {
    existingStores?: FetchedStores,
    updateSelectedName: UpdateMainFormValue;
    isActive: boolean;
  }