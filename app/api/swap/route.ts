import { NextRequest, NextResponse } from "next/server";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { connection } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const data: {
    quoteResponse: any;
    publicKey: any;
  } = await req.json();

  // Fetch the user's Solana wallet public key and any other necessary details
  const { publicKey } = data; // Adjust this to get publicKey from Okto wallet context or similar

  // Fetch the swap transaction from the Jupiter API
  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quoteResponse: data.quoteResponse,
        userPublicKey: publicKey, // Use Okto wallet's public key
        wrapAndUnwrapSol: true,
      }),
    })
  ).json();

  console.log(swapTransaction);
  const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
  const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  const latestBlockHash = await connection.getLatestBlockhash();

  // Construct the raw transaction data
  const rawTransaction = transaction.serialize();

  return NextResponse.json({
    rawTransaction,
    latestBlockHash, // Provide latest blockhash for transaction confirmation
  });
}
