import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sortBy") || "";

  function handleChange(e) {
    if (e.target.value === "") {
      searchParams.delete("sortBy");
      setSearchParams(searchParams);
      return;
    }

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
