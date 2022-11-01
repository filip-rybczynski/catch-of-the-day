// React
import { useEffect, useState } from "react";

// Types
import { UpdateMainFormValue } from "../types";

export const useMainFormValue = (): [string, UpdateMainFormValue] => {
  const [selectedStoreName, setSelectedStoreName] = useState("");

  const useActiveTabName = (newValue: string, isActiveTab: boolean) => {
    useEffect(() => {
      if (isActiveTab) setSelectedStoreName(newValue);
    }, [newValue, isActiveTab]);
  };

  return [selectedStoreName, useActiveTabName];
};
