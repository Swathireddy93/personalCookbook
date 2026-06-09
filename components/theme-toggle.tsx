"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("ritual-theme");
    const nextTheme: Theme = saved === "light" || saved === "dark" ? saved : "dark";

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggle() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("ritual-theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <Button aria-label="Toggle theme" onClick={toggle} size="icon" variant="ghost">
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
