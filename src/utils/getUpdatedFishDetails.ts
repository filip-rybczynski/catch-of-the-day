import { Availability } from "../components/types";
import { convertAvailability } from "../components/utils";

import { FishData, FishFormElements } from "../types";

export function getUpdatedFishDetails(
  targetElement: EventTarget & FishFormElements,
  currentFishDetails: FishData
): FishData {
  const { name: propertyName, value } = targetElement as {
    name: keyof FishData;
    value: string;
  };

  return {
    ...currentFishDetails,
    [propertyName]:
      propertyName === "isAvailable"
        ? convertAvailability(value as Availability)
        : parseFloat(value) || value, // if value is a string representing a number, it will convert to a number; if not, it will return NaN, which is falsy, and a regular string will be returned
  };
}
