import { forwardRef } from "react";

const Select = forwardRef(function Select(
  { options, value, onSelect, ...props },
  ref
) {
  return (
    <select value={value} ref={ref} onChange={onSelect} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
