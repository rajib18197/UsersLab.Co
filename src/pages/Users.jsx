import { useState } from "react";

import AddNewUser from "../features/users/AddNewUser";
import SearchUsers from "../features/users/SearchUsers";
import UsersList from "../features/users/UsersList";
import UsersListOperations from "../features/users/UsersListOperations";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { addUser } from "../services/apiUsers";
import { useDebounce } from "../hooks/useDebounce";

import { TIMEOUT_MILLISECONDS } from "../utils/constants";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newUserData, setNewUserData] = useState(null);

  const { doSearch } = useDebounce(
    handleSearchTermChange,
    TIMEOUT_MILLISECONDS
  );

  async function handleNewUserClick(newUser) {
    const results = await addUser(newUser);
    console.log(results);
    setNewUserData(results);
  }

  function handleSearchTermChange(value) {
    setSearchTerm(value);
    setCurrentPage(1);

    console.log(value);
  }

  return (
    <div className="flex flex-col gap-16 p-8">
      <div className="flex gap-2 justify-between">
        <Modal>
          <Modal.Open opens="add-new-user">
            {(handler) => (
              <Button type="primary" onClick={handler}>
                Add New User
              </Button>
            )}
          </Modal.Open>
          <Modal.Window windowName="add-new-user">
            {({ onCloseModal }) => (
              <AddNewUser
                onAddNewUser={handleNewUserClick}
                onCloseModal={onCloseModal}
              />
            )}
          </Modal.Window>
        </Modal>

        <UsersListOperations>
          <SearchUsers searchTerm={searchTerm} onSearchTermChange={doSearch} />
        </UsersListOperations>
      </div>
      <UsersList
        searchTerm={searchTerm}
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        newUserData={newUserData}
      />
    </div>
  );
}
