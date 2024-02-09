import { forwardRef } from "react";

export const classNames =
  "p-2 ring-4 rounded-[1px] ring-stone-200 ring-offset-1 focus:ring-gray-300 border-none outline-none bg-gray-200 text-stone-800";

const Input = forwardRef(({ type, id, ...props }, ref) => {
  return (
    <input type={type} id={id} className={classNames} {...props} ref={ref} />
  );
});

export default Input;
