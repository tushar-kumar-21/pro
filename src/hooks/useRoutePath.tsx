import { useLocation, useSearchParams } from "react-router-dom";

export const useRoutePath = (index: number): string | null => {
    const { pathname } = useLocation();
    const segments = pathname.split("/").filter(Boolean); // removes empty strings
    return segments[index] ?? null;
  };
  