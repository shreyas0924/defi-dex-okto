"use client";
import Link from "next/link";
import React from "react";
import { LayoutGridIcon } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logOut, isLoggedIn } = useOkto() as OktoContextType;
  const router = useRouter();
  async function handleLogout() {
    try {
      await signOut({ redirect: false });
      await logOut();
      console.log("Logging out and redirecting...");
      router.replace("/");
      return { result: "logout success" };
    } catch (error) {
      console.error("Logout failed:", error);
      return { result: "logout failed" };
    }
  }

  return (
    <header className="flex items-center h-16 px-6 border-b border-muted shrink-0">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold"
        prefetch={false}
      >
        <h1 className="font-semibold text-2xl">DeFi DEX</h1>
      </Link>
      {isLoggedIn ? (
        <>
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
            <Link
              href="/staking"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Staking
            </Link>
            <Link
              href="/transfer"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Transfer
            </Link>
            <div className="text-muted-foreground hover:text-foreground">
              More Coming soon....
            </div>
          </nav>
        </>
      ) : null}
      <div className="ml-auto flex items-center gap-4">
        {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : null}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
