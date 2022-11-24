import { ERROR_MESSAGES } from "../constants";

const validateLength = (input: string) => {
    if (input.length > 40) return ERROR_MESSAGES.tooLong;
  };

  export default validateLength