import { FilterInputsProps } from "./FilterInputs.interface";

export const FilterInputs = ({
  onChange,
  currentFilter,
  values,
  labelClassName,
}: FilterInputsProps) => {
  return (
    <>
      {[
        ...values.map((value) => (
          <label className={labelClassName} key={value}>
            <input
              type="radio"
              name="filter"
              value={value}
              checked={currentFilter === value}
              onChange={onChange}
            />
            {value}
          </label>
        )),
        // default option -> no filter/show all
        <label className={labelClassName} key={""}>
          <input
            type="radio"
            name="filter"
            value=""
            checked={currentFilter === ""}
            onChange={onChange}
          />
          all
        </label>,
      ]}
    </>
  );
};
