// React
import { useEffect, useState } from "react";

// Types
import { UpdateMainFormValue } from "../types";

// Exporting overloads - default value is optional. If it's not provided, return value may be undefined
export function useMainFormValue(
  defaultValue: string
): [string, UpdateMainFormValue];
export function useMainFormValue(): [string | undefined, UpdateMainFormValue];
export function useMainFormValue(
  defaultValue?: string
): [string | undefined, UpdateMainFormValue] {
  const [selectedStoreName, setSelectedStoreName] = useState(defaultValue);

  const useActiveTabName = (newValue: string, isActiveTab: boolean) => {
    useEffect(() => {
      if (isActiveTab) setSelectedStoreName(newValue);
    }, [newValue, isActiveTab]);
  };

  return [selectedStoreName, useActiveTabName];
}
