import { ButtonDetails, ButtonVals } from "./types";

export interface ToggleButtonGroupProps<T extends ButtonVals> {
    toggleButtons: ButtonDetails<T>[],
    valueHandler: (val: T) => void,
    mainButtonClass?: string,
}