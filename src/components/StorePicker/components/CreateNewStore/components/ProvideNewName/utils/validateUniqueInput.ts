import { ERROR_MESSAGES } from "../constants";
import { checkForDuplicates } from "../../../utils";

// returns a function which takes one string argument and checks if it's found in the initially provided list of potential duplicates
const validateUniqueInput = (duplicateList: string[]) => (str: string) =>
  checkForDuplicates(str.toLowerCase(), duplicateList)
    ? ERROR_MESSAGES.duplicate
    : undefined;

export default validateUniqueInput;
