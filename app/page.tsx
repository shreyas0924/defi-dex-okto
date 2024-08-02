"use client";

import { useSession, signIn } from "next-auth/react";
import { OktoContextType, useOkto } from "okto-sdk-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const { authenticate } = useOkto() as OktoContextType;

  useEffect(() => {
    if (session) {
      handleAuthenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function handleAuthenticate() {
    if (session?.id_token && typeof session.id_token === "string") {
      try {
        await new Promise((resolve, reject) => {
          authenticate(session.id_token as string, (result, error) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  }

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center ">
      <div className=" font-bold text-3xl mb-8">Welcome to Okto SDK</div>
      <Button onClick={handleSignIn} className="px-6 py-3 text-lg">
        Sign in with Google
      </Button>
    </main>
  );
}
