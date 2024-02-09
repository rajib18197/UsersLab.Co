import { useEffect, useRef, useState } from "react";

export function useData({ searchTerm, page, service }) {
  const [data, setData] = useState([]);
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

          const results = await ref.current({ searchTerm, page });
          console.log(results);
          if (!ignore) {
            if (searchTerm.length > 0 && page === 1) {
              setData(results.users);
            } else {
              if (searchTerm.length === 0 && page === 1) {
                setData(results.users);
              } else {
                setData((data) => [...data, ...results.users]);
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
    [searchTerm, page]
  );

  return { data, isLoading, isError, error, hasNextPage };
}
