import { Availability } from "../../../../types";
import { convertAvailability } from "../../../../utils";

import { AddFishFormElements, FishFormValues } from "../types";

export function getUpdatedFishDetails(
  targetElement: EventTarget & AddFishFormElements,
  currentFishDetails: FishFormValues
): FishFormValues {
  const { name: propertyName, value } = targetElement as {
    name: keyof FishFormValues;
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
