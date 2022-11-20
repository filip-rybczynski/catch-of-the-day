import validateLetters from "./validateLetters";
import validateNotEmpty from "./validateNotEmpty";
import validateLength from "./validateLength";

import { isErrorString } from ".";

export const validateInput = (input: string) => {
  const validations = [validateNotEmpty, validateLetters, validateLength];

  return validations.map((func) => func(input)).filter(isErrorString);
};
