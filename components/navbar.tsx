import Link from "next/link";
import React from "react";
import { LayoutGridIcon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";

const Navbar = () => {
  return (
    <header className="flex items-center h-16 px-6 border-b border-muted shrink-0">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <LayoutGridIcon className="w-6 h-6" />
        <span className="sr-only">DeFi Dashboard</span>
      </Link>
      <nav className="hidden sm:flex items-center gap-6 ml-auto font-medium text-sm">
        <Link
          href="/dashboard"
          className="text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          Dashboard
        </Link>

        <Link
          href="/swapping"
          className="text-muted-foreground hover:text-foreground"
          prefetch={false}
        >
          Swapping
        </Link>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
