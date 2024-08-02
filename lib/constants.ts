import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

export const OKTO_CLIENT_API = process.env.NEXT_PUBLIC_OKTO_CLIENT_API!;
export const OKTO_SERVER_API = process.env.NEXT_PUBLIC_OKTO_SERVER_API!;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
export const GOOGLE_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!;
export const baseUrl = "https://sandbox-api.okto.tech";
export const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY!;

let LAST_UPDATED: number | null = null;
let prices: {
  [key: string]: {
    price: string;
  };
} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s

export const connection = new Connection(
  `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`
);
// export const connection = new Connection("https://api.devnet.solana.com");
