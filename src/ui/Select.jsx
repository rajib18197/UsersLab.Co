import { forwardRef } from "react";

const Select = forwardRef(function Select(
  { options, value, onSelect, ...props },
  ref
) {
  return (
    <select
      className="border-2 border-slate-800 p-1"
      value={value}
      ref={ref}
      onChange={onSelect}
      {...props}
    >
      <option value="">Select a Value</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

export default Select;
