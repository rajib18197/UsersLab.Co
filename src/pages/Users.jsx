import { useState } from "react";
import SearchUsers from "../features/users/SearchUsers";
import UsersList from "../features/users/UsersList";
import UsersListOperations from "../features/users/UsersListOperations";
import Heading from "../ui/Heading";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  function handleSearchTermChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <div className="flex gap-2 justify-between">
        <Heading as="h1">Users List</Heading>
        <UsersListOperations>
          <SearchUsers
            searchTerm={searchTerm}
            onSearchTermChange={handleSearchTermChange}
          />
        </UsersListOperations>
      </div>
      <UsersList
        searchTerm={searchTerm}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
      />
    </div>
  );
}
