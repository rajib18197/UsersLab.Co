import { useEffect, useRef } from "react";

export function useDebounce(callback, delay) {
  const ref = useRef();

  useEffect(() => {
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, []);

  const doSearch = function (...args) {
    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return { doSearch };
}
