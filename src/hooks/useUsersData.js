import { useEffect, useRef, useState } from "react";

export function useUsersData({ searchTerm, page, service, id, newUserData }) {
  const [data, setData] = useState(id ? {} : []);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const ref = useRef();

  if (service) {
    ref.current = service;
  }

  useEffect(
    function () {
      // this variable is to avoid race condition
      let ignore = false;

      async function loadData() {
        try {
          setIsLoading(true);
          setIsError(false);
          setError(null);

          // As we use this hook to fetch all the users data as well as individual user data that's why we need to check here if we fetches for specific user or for all the users
          const apiService = id
            ? ref.current({ id })
            : ref.current({ searchTerm, page });

          const results = await apiService;

          if (!ignore) {
            if (id) {
              setData(results);
              return;
            }

            // If there is a searchTerm and current page is equal to 1, or if there is no searchTerm but current page is equal to 1 then set the data from scratch so that previous results (If any) are not added up. Otherwise set the data with both previous pages results and current page results.
            if (
              (searchTerm.length > 0 && page === 1) ||
              (searchTerm.length === 0 && page === 1)
            ) {
              setData(results.users);
            } else {
              setData((prevData) => [...prevData, ...results.users]);
            }

            // If we added a newUser with a post request, then the API is not going to store that data permanenetly instead it just send the newly created data with some additional information. So to handle that add that new user data that was sent from the server manually here to reflect that in the UI.
            if (newUserData.length > 0) {
              setData((prevData) => {
                const newData = [];
                newUserData.forEach((user) => newData.push(user));
                return [...newData, ...prevData];
              });
            }

            // Since we are fetching only a small chunk of data from the API and only if users are reached to a specific point in the UI then we will fetch the next chunks, that's why we have to check If we got all the data or Not, If yes, setHasNextPage to false, If not set it to true so that we can fetch the rest of data as we need them.
            setHasNextPage(results.users.length + results.skip < results.total);
          }
        } catch (err) {
          setIsError(true);
          setError({ message: err.message });
        } finally {
          setIsLoading(false);
        }
      }
      loadData();

      return () => {
        ignore = true;
      };
    },
    [searchTerm, page, newUserData]
  );

  return { data, isLoading, isError, error, hasNextPage };
}
