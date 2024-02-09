import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || options.at(0).value;

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      name="SortBy"
      id="SortBy"
      options={options}
      value={sortValue}
      onSelect={handleChange}
    />
  );
}
