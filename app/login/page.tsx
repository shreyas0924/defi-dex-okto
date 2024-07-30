"use client";
import { GoogleLogin } from "@react-oauth/google";
import { useOkto, type OktoContextType } from "okto-sdk-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { OKTO_CLIENT_API } from "@/lib/constants";

const Login = () => {
  const router = useRouter();
  const { authenticate } = useOkto() as OktoContextType;
  const [authToken, setAuthToken] = useState();
  const BASE_URL = "https://sandbox-api.okto.tech";

  const apiService = axios.create({
    baseURL: BASE_URL,
    headers: {
      "x-api-key": OKTO_CLIENT_API,
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
  });

  const setPin = (idToken: any, token: any, reloginPin: any) => {
    return apiService.post("/api/v1/set_pin", {
      id_token: idToken,
      token: token,
      relogin_pin: reloginPin,
      purpose: "set_pin",
    });
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);

    authenticate(idToken, async (authResponse: any, error: any) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);

        if (authResponse.action === "signup") {
          console.log("User Signup");
          const pinToken = authResponse.token;
          await setPin(idToken, pinToken, "0000");

          // Re-authenticate after setting pin
          await authenticate(idToken, async (res: any) => {
            if (res) {
              setAuthToken(res.auth_token);
              console.log("auth token received", res.auth_token);
              router.push("/");
            }
          });
        } else {
          // For existing users
          setAuthToken(authResponse.auth_token);
          console.log("auth token received", authResponse.auth_token);
          router.push("/");
        }
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };
  return (
    <div>
      <h1>Login</h1>
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          useOneTap
          promptMomentNotification={(notification) =>
            console.log("Prompt moment notification:", notification)
          }
        />
      ) : (
        <> Authenticated </>
      )}
    </div>
  );
};

export default Login;
