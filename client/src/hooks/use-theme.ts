import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export function ThemeSync() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return null;
}
