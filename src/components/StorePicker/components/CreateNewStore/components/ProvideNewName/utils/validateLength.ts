import { ERROR_MESSAGES } from "../constants";

const validateLength = (input: string) => {
    const words = input.split(" ");
  
    if (words.length > 3) return ERROR_MESSAGES.max3;
  };

  export default validateLength