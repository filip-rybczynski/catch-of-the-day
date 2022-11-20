import { ERROR_MESSAGES } from "../constants";

type ErrorTypes = keyof typeof ERROR_MESSAGES;
export type ErrorStrings = typeof ERROR_MESSAGES[ErrorTypes];