"use client";

import { useEffect, useState } from "react";

/** Subscribes to a `matchMedia` query, e.g. `useMediaQuery("(min-width: 768px)")`. */
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export { useMediaQuery };
