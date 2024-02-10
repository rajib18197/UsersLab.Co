export default function Heading({ as, children }) {
  const headingType = {
    h1: "uppercase text-xl",
    h2: "text-[16px] uppercase sm:text-xl",
    h3: "uppercase text-xl",
  };
  const Type = as;
  //   <h1 className="uppercase text-xl"></h1>
  return <Type className={headingType[as]}>{children}</Type>;
}
