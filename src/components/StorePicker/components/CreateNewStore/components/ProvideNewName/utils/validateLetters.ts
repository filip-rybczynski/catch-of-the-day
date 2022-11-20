import { ERROR_MESSAGES } from "../constants";

const validateLetters = (input: string) => {
    if (input && !/^[a-zA-Z\s]+$/.test(input)) return ERROR_MESSAGES.onlyLetters;
  };

  export default validateLetters;