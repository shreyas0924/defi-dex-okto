"use client";

import { GOOGLE_CLIENT_ID, OKTO_CLIENT_API } from "@/lib/constants";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <OktoProvider apiKey={OKTO_CLIENT_API} buildType={BuildType.SANDBOX}>
            {children}
          </OktoProvider>
        </SessionProvider>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider> */}
    </ThemeProvider>
  );
}
