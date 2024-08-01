import { baseUrl, OKTO_CLIENT_API } from "@/lib/constants";

export const getPortfolio = async (user_id: string) => {
  const response = await fetch(
    `${baseUrl}/s2s/api/v1/portfolio?user_id=${user_id}`,
    {
      method: "GET",
      headers: {
        "x-api-key": OKTO_CLIENT_API,
        accept: "application/json",
      },
    }
  );
  return response;
};
