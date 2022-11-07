import { ButtonVals } from "./ButtonVals.type";

export interface ButtonDetails<T extends ButtonVals> {
    val: T,
    label: string
}