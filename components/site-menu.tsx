"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = ["Nutrient Snapshot", "Biomarkers"];

export function SiteMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Button
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Open menu"
        onClick={() => setOpen((current) => !current)}
        size="icon"
        variant="ghost"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {open ? (
        <div
          className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-md border border-border/70 bg-background/95 p-1.5 shadow-2xl backdrop-blur-xl"
          role="menu"
        >
          {menuItems.map((item) => (
            <span
              className="block rounded px-3 py-2.5 text-sm text-foreground/78"
              key={item}
              role="menuitem"
            >
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
