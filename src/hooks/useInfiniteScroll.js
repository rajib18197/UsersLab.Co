import { useCallback, useLayoutEffect, useRef } from "react";

export function useInfiniteScroll({ hasNextPage, callback }) {
  let intObserver = useRef();
  const ref = useRef();

  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  const refCallback = useCallback(
    function (node) {
      console.log(node);
      if (intObserver.current) intObserver.current.disconnect();

      if (node) {
        intObserver.current = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            if (hasNextPage) {
              ref.current((page) => page + 1);
            }
          }
        });

        intObserver.current.observe(node);
      }
    },
    [hasNextPage]
  );

  return { refCallback };
}
