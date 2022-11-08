export interface FilterInputsProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    currentFilter: string,
    values: string[],
    labelClassName?: string,
}