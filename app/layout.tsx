import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteMenu } from "@/components/site-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export const metadata: Metadata = {
  title: "My Daily Ritual Cookbook",
  description: "Science-backed recipes, habits, and nutritional rituals that I personally follow."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <header className="sticky top-0 z-50 border-b bg-background/86 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="font-display text-base font-semibold tracking-wide">
              Rituals
            </Link>
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <ThemeToggle />
              <SiteMenu />
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
