// "use client";

// import React, { useState } from "react";
// import {
//   PublicKey,
//   Transaction,
//   TransactionInstruction,
// } from "@solana/web3.js";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
// import Decimal from "decimal.js";
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   CardTitle,
//   CardDescription,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { ArrowDownIcon } from "lucide-react";
// import { useOkto, type OktoContextType } from "okto-sdk-react";
// import { useQuery } from "@tanstack/react-query";

// const tokens = [
//   {
//     symbol: "SOL",
//     name: "Solana",
//     mint: "So11111111111111111111111111111111111111112",
//   },
//   {
//     symbol: "USDC",
//     name: "USD Coin",
//     mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
//   },
// ];

// const EXCHANGE_RATE = 0.01;
// const SWAP_PROGRAM_ID = "4BfBtRGgWq3TuP1t7DEdJneaTgha5ChV5w4NhhtXTEVs";

// export default function SwapPage() {
//   const {
//     executeRawTransaction,
//     getPortfolio,
//     getWallets,
//     getRawTransactionStatus,
//   } = useOkto() as OktoContextType;
//   const [fromToken, setFromToken] = useState(tokens[0]);
//   const [toToken, setToToken] = useState(tokens[1]);
//   const [amount, setAmount] = useState("");
//   const [txnStatus, setTxnStatus] = useState<any>(null);
//   const [orderId, setOrderId] = useState("");
//   const { data: portfolio = { tokens: [] } } = useQuery({
//     queryKey: ["portfolio"],
//     queryFn: getPortfolio,
//     select: (data) => data || { tokens: [] },
//   });

//   const { data: walletsData } = useQuery({
//     queryKey: ["wallets"],
//     queryFn: getWallets,
//   });

//   const handleSwap = async () => {
//     try {
//       if (!walletsData || !walletsData.wallets) {
//         throw new Error("Wallet data is not available");
//       }

//       const transaction = new Transaction();

//       const solanaWallet = walletsData.wallets.find(
//         (w) => w.network_name === "SOLANA_DEVNET"
//       );

//       if (!solanaWallet || !solanaWallet.address) {
//         throw new Error("Solana wallet not found");
//       }

//       const userPublicKey = new PublicKey(solanaWallet.address);

//       const swapInstruction = new TransactionInstruction({
//         keys: [
//           { pubkey: userPublicKey, isSigner: true, isWritable: true },
//           {
//             pubkey: new PublicKey(fromToken.mint),
//             isSigner: false,
//             isWritable: true,
//           },
//           {
//             pubkey: new PublicKey(toToken.mint),
//             isSigner: false,
//             isWritable: true,
//           },
//           { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
//         ],
//         programId: new PublicKey(SWAP_PROGRAM_ID),
//         data: Buffer.concat([
//           Buffer.from([0]),
//           Buffer.from(new Decimal(amount).toFixed()),
//           Buffer.from(new Decimal(EXCHANGE_RATE).toFixed()),
//         ]),
//       });

//       transaction.add(swapInstruction);

//       const requestData = {
//         network_name: "SOLANA_DEVNET",
//         transaction: {
//           instructions: transaction.instructions.map((instr) => ({
//             keys: instr.keys.map((key) => ({
//               pubkey: key.pubkey.toString(),
//               isSigner: key.isSigner,
//               isWritable: key.isWritable,
//             })),
//             programId: instr.programId.toString(),
//             data: Array.from(instr.data),
//           })),
//           signers: [userPublicKey.toString()],
//         },
//       };

//       const result = await executeRawTransaction(requestData);
//       console.log("Swap transaction submitted:", result.jobId);
//       // const status = await getRawTransactionStatus({
//       //   order_id: "691822e5-2854-435c-98b1-9e2a7367326b",
//       // });
//       // console.log("TXN status", status);
//       // Show success message
//     } catch (error) {
//       console.error("Swap failed:", error);
//       // Show error message
//     }
//   };

//   const handleOrderIdStatus = async (orderId: string) => {
//     const status = await getRawTransactionStatus({ order_id: orderId });
//     setTxnStatus(status);
//   };

//   const txnStatusDisplay = txnStatus
//     ? JSON.stringify(txnStatus, null, 2)
//     : "No status available";

//   const switchTokens = () => {
//     setFromToken(toToken);
//     setToToken(fromToken);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Swap Tokens</CardTitle>
//           <CardDescription>Exchange your Solana tokens</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">From</label>
//               <div className="flex space-x-2">
//                 <Select
//                   value={fromToken.symbol}
//                   onValueChange={(value) =>
//                     setFromToken(tokens.find((t) => t.symbol === value)!)
//                   }
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select token" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {tokens.map((token) => (
//                       <SelectItem key={token.symbol} value={token.symbol}>
//                         {token.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Input
//                   type="number"
//                   placeholder="0.00"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <Button variant="ghost" size="icon" onClick={switchTokens}>
//                 <ArrowDownIcon className="h-6 w-6" />
//               </Button>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">To</label>
//               <Select
//                 value={toToken.symbol}
//                 onValueChange={(value) =>
//                   setToToken(tokens.find((t) => t.symbol === value)!)
//                 }
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select token" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {tokens.map((token) => (
//                     <SelectItem key={token.symbol} value={token.symbol}>
//                       {token.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button className="w-full" onClick={handleSwap}>
//             Swap
//           </Button>
//         </CardFooter>

//         <Input
//           type="text"
//           value={txnStatus}
//           onChange={(e) => setOrderId(e.currentTarget.value)}
//         />
//         <Button onClick={() => handleOrderIdStatus(orderId)}>
//           Check ORderID
//         </Button>
//         <pre>{txnStatusDisplay}</pre>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
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
import { useQuery } from "@tanstack/react-query";

const JUPITER_QUOTE_API = "https://quote-api.jup.ag/v6/quote";
const JUPITER_SWAP_API = "https://quote-api.jup.ag/v6/swap";

const tokens = [
  {
    symbol: "SOL",
    name: "Solana",
    mint: "So11111111111111111111111111111111111111112",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },
];

export default function SwapPage() {
  const {
    executeRawTransaction,
    getPortfolio,
    getWallets,
    getRawTransactionStatus,
  } = useOkto() as OktoContextType;
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [amount, setAmount] = useState("");
  const [txnStatus, setTxnStatus] = useState<any>(null);
  const [orderId, setOrderId] = useState("");
  const { data: portfolio = { tokens: [] } } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    select: (data) => data || { tokens: [] },
  });

  const { data: walletsData } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });
  const handleOrderIdStatus = async (orderId: string) => {
    const status = await getRawTransactionStatus({ order_id: orderId });
    setTxnStatus(status);
  };
  const txnStatusDisplay = txnStatus
    ? JSON.stringify(txnStatus, null, 2)
    : "No status available";
  const handleSwap = async () => {
    try {
      if (!walletsData || !walletsData.wallets) {
        throw new Error("Wallet data is not available");
      }

      const solanaWallet = walletsData.wallets.find(
        (w) => w.network_name === "SOLANA_DEVNET"
      );
      if (!solanaWallet) {
        throw new Error("Solana wallet not found");
      }

      const userPublicKey = solanaWallet.address;

      const quoteResponse = await (
        await fetch(
          `${JUPITER_QUOTE_API}?inputMint=${fromToken.mint}&outputMint=${toToken.mint}&amount=${amount}&slippageBps=50`
        )
      ).json();

      const { swapTransaction } = await (
        await fetch(JUPITER_SWAP_API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quoteResponse,
            userPublicKey,
            wrapAndUnwrapSol: true,
          }),
        })
      ).json();

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      const requestData = {
        network_name: "SOLANA_DEVNET",
        transaction: {
          instructions: transaction.message.compiledInstructions.map(
            (instr) => ({
              programId: instr.programIdIndex.toString(),
              accounts: instr.accountKeyIndexes.map((index) =>
                index.toString()
              ),
              data: Array.from(instr.data),
            })
          ),
          signers: [userPublicKey],
        },
      };

      const result = await executeRawTransaction(requestData);
      console.log("Swap transaction submitted:", result.jobId);
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  const switchTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Swap Tokens</CardTitle>
          <CardDescription>Exchange your Solana tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">From</label>
              <div className="flex space-x-2">
                <Select
                  value={fromToken.symbol}
                  onValueChange={(value) =>
                    setFromToken(tokens.find((t) => t.symbol === value)!)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        {token.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="ghost" size="icon" onClick={switchTokens}>
                <ArrowDownIcon className="h-6 w-6" />
              </Button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To</label>
              <Select
                value={toToken.symbol}
                onValueChange={(value) =>
                  setToToken(tokens.find((t) => t.symbol === value)!)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSwap}>
            Swap
          </Button>
        </CardFooter>
        <Input
          type="text"
          value={txnStatus}
          onChange={(e) => setOrderId(e.currentTarget.value)}
        />
        <Button onClick={() => handleOrderIdStatus(orderId)}>
          Check ORderID
        </Button>
        <pre>{txnStatusDisplay}</pre>
      </Card>
    </div>
  );
}
