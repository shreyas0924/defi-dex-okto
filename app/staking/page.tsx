"use client";

import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { StakeProgram } from "@solana/web3.js";
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

export default function StakingPage() {
  //   const { connection } = useConnection();
  //   const { publicKey, signTransaction } = useWallet();
  //   const [balance, setBalance] = useState<number | null>(null);
  //   const [amount, setAmount] = useState("");
  //   const [isStaking, setIsStaking] = useState(true);

  //   useEffect(() => {
  //     if (publicKey) {
  //       fetchBalance();
  //     }
  //   }, [publicKey, connection]);

  //   const fetchBalance = async () => {
  //     if (!publicKey) return;
  //     const balance = await connection.getBalance(publicKey);
  //     setBalance(balance / LAMPORTS_PER_SOL);
  //   };

  //   const handleStakeUnstake = async () => {
  //     if (!publicKey || !signTransaction) return;

  //     try {
  //       if (isStaking) {
  //         const stakeAccount = StakeProgram.createAccount({
  //           fromPubkey: publicKey,
  //           authorized: {
  //             staker: publicKey,
  //             withdrawer: publicKey,
  //           },
  //           lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
  //         });

  //         const validator = new PublicKey("YOUR_VALIDATOR_PUBKEY"); // Replace with actual validator pubkey
  //         const stakeInstruction = StakeProgram.delegate({
  //           stakePubkey: stakeAccount.pubkey,
  //           authorizedPubkey: publicKey,
  //           votePubkey: validator,
  //         });

  //         const transaction = new Transaction().add(
  //           stakeAccount.instructions[0],
  //           stakeInstruction
  //         );
  //         const signedTx = await signTransaction(transaction);
  //         const signature = await connection.sendRawTransaction(
  //           signedTx.serialize()
  //         );
  //         await connection.confirmTransaction(signature, "confirmed");
  //       } else {
  //         // Implement unstaking logic here
  //         // This would involve creating a deactivate instruction and then a withdraw instruction
  //       }
  //       fetchBalance();
  //       // Show success message
  //     } catch (error) {
  //       console.error("Operation failed:", error);
  //       // Show error message
  //     }
  //   };

  return (
    <div className="container mx-auto p-4">
      {/* <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Staking</CardTitle>
          <CardDescription>Stake your SOL to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">
                Balance: {balance?.toFixed(4) || "Loading..."} SOL
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={isStaking ? "default" : "outline"}
                className="w-1/2"
                onClick={() => setIsStaking(true)}
              >
                Stake
              </Button>
              <Button
                variant={!isStaking ? "default" : "outline"}
                className="w-1/2"
                onClick={() => setIsStaking(false)}
              >
                Unstake
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStakeUnstake}>
            {isStaking ? "Stake" : "Unstake"}
          </Button>
        </CardFooter>
      </Card> */}
      <div className="text-center text-4xl font-semibold my-10">
        Staking Coming Soon...
      </div>
    </div>
  );
}
