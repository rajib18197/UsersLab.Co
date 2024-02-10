import { useSearchParams } from "react-router-dom";

import { useUsersData } from "../../hooks/useUsersData";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

import { getUsers } from "../../services/apiUsers";
import { sort } from "../../utils/helpers";

import UserCard from "./UserCard";
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

export default function UsersList({
  searchTerm,
  currentPage,
  onCurrentPageChange,
  newUserData,
}) {
  const [searchParams] = useSearchParams();

  const {
    data: users,
    isLoading,
    isError,
    error,
    hasNextPage,
  } = useUsersData({
    searchTerm,
    page: currentPage,
    service: getUsers,
    newUserData: newUserData,
  });

  console.log(hasNextPage);

  // For Infinite Scroll
  const { refCallback } = useInfiniteScroll({
    hasNextPage,
    callback: onCurrentPageChange,
  });

  if (isError) return <Error message={error.message} />;

  // Sorting
  let sortedUsers = users;
  let sortBy = searchParams.get("sortBy");

  if (sortBy) {
    const [field, direction] = sortBy.split("-") || [];
    console.log(field);
    const modifier = direction === "asc" ? 1 : -1;

    sortedUsers = sort(users, field, modifier);
    console.log(sortedUsers);
  }

  return (
    <div className="grid grid-cols-1 place-items-center gap-16 md:grid-cols-2 lg:grid-cols-3">
      {sortedUsers?.map((user, i) =>
        sortedUsers?.length === i + 1 ? (
          <UserCard
            key={user.email}
            namestr={users.length}
            str={i + 1}
            user={user}
            ref={refCallback}
          />
        ) : (
          <UserCard key={user.email} user={user} />
        )
      )}

      {isLoading && <Loader />}
    </div>
  );
}
