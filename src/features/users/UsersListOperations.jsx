import SortBy from "../../ui/SortBy";

export default function UsersListOperations({ children }) {
  return (
    <div className="flex gap-6 items-center">
      {children}

      <SortBy
        options={[
          { value: "name-asc", label: "Sort By Name (A-Z)" },
          { value: "name-desc", label: "Sort By Name (Z-A)" },
          { value: "email-asc", label: "Sort By Name (A-Z)" },
          { value: "email-desc", label: "Sort By Name (A-Z)" },
          { value: "company-asc", label: "Sort By Company Name (A-Z)" },
          { value: "company-desc", label: "Sort By Company Name (A-Z)" },
        ]}
      />
    </div>
  );
}
