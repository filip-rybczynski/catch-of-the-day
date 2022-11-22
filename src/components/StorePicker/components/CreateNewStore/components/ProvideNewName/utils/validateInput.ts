import validateLetters from "./validateLetters";
import validateNotEmpty from "./validateNotEmpty";
import validateLength from "./validateLength";
import validateUniqueInput from "./validateUniqueInput";

import { isErrorString } from ".";

export const validateInput = (
  input: string,
  storeKeyStrings: string[] = []
) => {
  const storeNames = storeKeyStrings.map(name => name.replace(/-/g, " "));
  
  const validations = [
    validateNotEmpty,
    validateLetters,
    validateLength,
    validateUniqueInput(storeNames), // returns a function which takes one string argument and checks if it's found in the initially provided list of potential duplicates
  ];

  return validations.map((func) => func(input)).filter(isErrorString);
};
