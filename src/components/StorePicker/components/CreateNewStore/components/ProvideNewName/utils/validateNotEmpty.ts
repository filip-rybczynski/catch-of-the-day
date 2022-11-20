import { ERROR_MESSAGES } from "../constants";

const validateNotEmpty = (input: string) => {
  if (input === "") return ERROR_MESSAGES.emptyString;
};

export default validateNotEmpty;
