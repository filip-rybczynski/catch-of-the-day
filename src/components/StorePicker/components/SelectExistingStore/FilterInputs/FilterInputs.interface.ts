export interface FilterInputsProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    currentFilter: string,
    values:  ReadonlyArray<string> | Array<string>,
    labelClassName?: string,
}