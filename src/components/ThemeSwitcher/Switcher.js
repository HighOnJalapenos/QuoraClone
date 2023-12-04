import { useEffect, useState } from "react";

export default function Switcher() {
  const [currTheme, setCurrTheme] = useState(localStorage.theme || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    root.className = currTheme;
    body.className = currTheme;
  }, [currTheme]);

  const toggleDarkMode = (e) => {
    e.stopPropagation();
    setCurrTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  return (
    <div
      className="hover:bg-[#00000008] px-4 py-2 cursor-pointer dark:hover:bg-[rgba(255,255,255,0.04)]"
      onClick={toggleDarkMode}
    >
      Change theme ({currTheme}mode on)
    </div>
  );
}
