import { useEffect, useRef, useState } from "react";

export function useData({ searchTerm, page, service, id, newUserData }) {
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
      let ignore = false;
      async function loadData() {
        try {
          setIsLoading(true);
          setIsError(false);
          setError(null);

          const apiService = id
            ? ref.current({ id })
            : ref.current({ searchTerm, page });
          const results = await apiService;
          console.log(results);

          if (!ignore) {
            if (id) {
              setData(results);
              return;
            }

            if (searchTerm.length > 0 && page === 1) {
              setData(results.users);
            } else {
              if (searchTerm.length === 0 && page === 1) {
                let data = [];
                if (newUserData) data = [{ ...newUserData }];
                setData([...data, ...results.users]);
              } else {
                let data = [];
                if (newUserData) data = [{ ...newUserData }];
                setData((prevData) => [...data, ...prevData, ...results.users]);
              }
            }

            setHasNextPage(data.length < results.total);
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
