"use client";

import { GOOGLE_CLIENT_ID, OKTO_CLIENT_API } from "@/lib/constants";
import { BuildType, OktoProvider } from "okto-sdk-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <OktoProvider apiKey={OKTO_CLIENT_API} buildType={BuildType.SANDBOX}>
        {children}
      </OktoProvider>
    </GoogleOAuthProvider>
  );
}
