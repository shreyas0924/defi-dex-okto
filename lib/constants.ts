import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

export const OKTO_CLIENT_API = process.env.NEXT_PUBLIC_OKTO_CLIENT_API!;
export const OKTO_SERVER_API = process.env.NEXT_PUBLIC_OKTO_SERVER_API!;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
export const baseUrl = "https://sandbox-api.okto.tech";

let LAST_UPDATED: number | null = null;
let prices: {
  [key: string]: {
    price: string;
  };
} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s

// export const connection = new Connection(
//   "https://mainnet.helius-rpc.com/?api-key=f51ac02d-ad2a-4a65-8874-dbbdf10182bd"
// );
export const connection = new Connection("https://api.devnet.solana.com");

export async function getSupportedTokens() {
  if (
    !LAST_UPDATED ||
    new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL
  ) {
    try {
      const response = await axios.get(
        "https://price.jup.ag/v6/price?ids=SOL,USDC,USDT"
      );
      prices = response.data.data;
      LAST_UPDATED = new Date().getTime();
    } catch (e) {
      console.log(e);
    }
  }
  return SUPPORTED_TOKENS.map((s) => ({
    ...s,
    price: prices[s.name].price,
  }));
}

getSupportedTokens();
