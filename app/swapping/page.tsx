"use client";

import React, { useState, useEffect } from "react";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { getOrca, OrcaPoolConfig, OrcaU64 } from "@orca-so/sdk";
import Decimal from "decimal.js";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowDownIcon } from "lucide-react";
import { useOkto, type OktoContextType } from "okto-sdk-react";

export default function SwapPage() {
  // const { executeRawTransaction } = useOkto() as OktoContextType;
  // const [fromToken, setFromToken] = useState(tokens[0]);
  // const [toToken, setToToken] = useState(tokens[1]);
  // const [amount, setAmount] = useState("");
  // const [balances, setBalances] = useState<Record<string, number>>({});

  // const fetchBalances = async () => {
  //   const newBalances: Record<string, number> = {};
  //   for (const token of tokens) {
  //     if (token.symbol === "SOL") {
  //       const balance = await connection.getBalance(new PublicKey(token.mint));
  //       newBalances[token.symbol] = balance / 1e9;
  //     } else {
  //       const tokenAccount = await connection.getTokenAccountsByOwner(
  //         new PublicKey(token.mint),
  //         { mint: new PublicKey(token.mint) }
  //       );
  //       if (tokenAccount.value.length > 0) {
  //         const balance = await connection.getTokenAccountBalance(
  //           tokenAccount.value[0].pubkey
  //         );
  //         newBalances[token.symbol] = parseFloat(balance.value.amount) / 1e6;
  //       } else {
  //         newBalances[token.symbol] = 0;
  //       }
  //     }
  //   }
  //   setBalances(newBalances);
  // };

  // const handleSwap = async () => {
  //   const orca = getOrca(connection);
  //   const fromMint = new PublicKey(fromToken.mint);
  //   const toMint = new PublicKey(toToken.mint);

  //   try {
  //     const pool = orca.getPool(OrcaPoolConfig.SOL_USDC);
  //     const fromTokenAmount = OrcaU64.fromDecimal(new Decimal(amount));
  //     const quote = await pool.getQuote(pool.getTokenA(), fromTokenAmount);
  //     const minimumAmountOut = quote.getMinOutputAmount();
  //     const swapPayload = await pool.swap(
  //       pool.getTokenA(),
  //       fromTokenAmount,
  //       minimumAmountOut,
  //       toMint
  //     );

  //     const { transaction, signers } = swapPayload;
  //     transaction.partialSign(...signers);

  //     const requestData = {
  //       network_name: "SOLANA_DEVNET", // or your network
  //       transaction: {
  //         instructions: transaction.instructions.map(
  //           (instr: TransactionInstruction) => ({
  //             keys: instr.keys.map((key) => ({
  //               pubkey: key.pubkey.toString(),
  //               isSigner: key.isSigner,
  //               isWritable: key.isWritable,
  //             })),
  //             programId: instr.programId.toString(),
  //             data: Array.from(instr.data),
  //           })
  //         ),
  //         signers: signers.map((signer) => signer.publicKey.toString()),
  //       },
  //     };

  //     executeRawTransaction(requestData)
  //       .then((result) => {
  //         console.log(result.jobId);
  //         fetchBalances();
  //         // Show success message
  //       })
  //       .catch((error) => {
  //         console.error("Swap failed:", error);
  //         // Show error message
  //       });
  //   } catch (error) {
  //     console.error("Swap failed:", error);
  //     // Show error message
  //   }
  // };

  // const switchTokens = () => {
  //   setFromToken(toToken);
  //   setToToken(fromToken);
  // };

  return <div className="container mx-auto p-4">Swap</div>;
}
