import { useCallback, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import { getUsers } from "../../services/apiUsers";
import UserCard from "./UserCard";
import { sort } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
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
  } = useData({
    searchTerm,
    page: currentPage,
    service: getUsers,
    newUserData: newUserData,
  });

  console.log(hasNextPage);

  const { refCallback } = useInfiniteScroll({
    hasNextPage,
    callback: onCurrentPageChange,
  });

  if (isError) return <Error message={error.message} />;

  // 1) Sorting
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
    <div className="grid grid-cols-3 gap-16">
      {sortedUsers?.map((user, i) =>
        sortedUsers?.length === i + 1 ? (
          <UserCard
            key={user.id}
            namestr={users.length}
            str={i + 1}
            user={user}
            ref={refCallback}
          />
        ) : (
          <UserCard key={user.id} user={user} />
        )
      )}

      {isLoading && <Loader />}
    </div>
  );
}
