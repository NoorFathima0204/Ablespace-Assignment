"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem(
      "ablespace-theme"
    ) as Theme | null;

    const initialTheme = savedTheme ?? "light";

    setTheme(initialTheme);

    document.documentElement.classList.toggle(
      "dark",
      initialTheme === "dark"
    );
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";

    setTheme(nextTheme);
    localStorage.setItem("ablespace-theme", nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="flex h-9 items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3 text-sm text-[#666666] transition hover:bg-[#f7f7f7]"
    >
      <span aria-hidden="true">
        {theme === "light" ? "☾" : "☀"}
      </span>

      <span>
        {theme === "light" ? "Dark" : "Light"}
      </span>
    </button>
  );
}