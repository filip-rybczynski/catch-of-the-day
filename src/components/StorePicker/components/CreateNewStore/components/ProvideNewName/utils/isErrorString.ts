import { ErrorStrings } from "../types";

export const isErrorString = (arg: ErrorStrings | undefined): arg is ErrorStrings => {
    return arg !== undefined;
}
