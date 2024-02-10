import { useCallback, useRef, useState } from "react";
import { useData } from "../../hooks/useData";
import { getUsers } from "../../services/apiUsers";
import UserCard from "./UserCard";
import { sort } from "../../utils/helpers";
import { useSearchParams } from "react-router-dom";

export default function UsersList({
  searchTerm,
  currentPage,
  onCurrentPageChange,
}) {
  const ref = useRef();
  const [searchParams] = useSearchParams();

  const {
    data: users,
    isLoading,
    isError,
    error,
    hasNextPage,
  } = useData({ searchTerm, page: currentPage, service: getUsers });

  console.log(hasNextPage);

  let intObserver = useRef();

  const callback = useCallback(
    function (node) {
      console.log(node);
      if (intObserver.current) intObserver.current.disconnect();

      if (node) {
        intObserver.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            if (hasNextPage) {
              onCurrentPageChange((page) => page + 1);
            }
          }
        });
        intObserver.current.observe(node);
      }
    },
    [hasNextPage]
  );

  if (isError) return <h2>{error.message}</h2>;
  console.log(users.length);

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
            ref={callback}
          />
        ) : (
          <UserCard key={user.id} user={user} />
        )
      )}

      {isLoading && <h2>Loading</h2>}
    </div>
  );
}
