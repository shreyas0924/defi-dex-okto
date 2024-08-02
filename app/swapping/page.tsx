"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useOkto, type OktoContextType } from "okto-sdk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUPPORTED_TOKENS, TokenDetails } from "@/lib/tokens";
import { TokenWithBalance, useTokens } from "@/hooks/useToken";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownUp } from "lucide-react";

function Swap({
  tokenBalances,
  publicKey,
}: {
  tokenBalances: {
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null;
  publicKey: string | null;
}) {
  const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKENS[0]);
  const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKENS[1]);
  const [baseAmount, setBaseAmount] = useState<string>("");
  const [quoteAmount, setQuoteAmount] = useState<string>("");
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<any>(null);
  const [txnStatus, setTxnStatus] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const {
    executeRawTransaction,
    getPortfolio,
    getWallets,
    getRawTransactionStatus,
  } = useOkto() as OktoContextType;

  const checkOrderStatus = async () => {
    if (!orderId) {
      alert("Order ID is not available");
      return;
    }

    setIsCheckingStatus(true);
    let attempts = 0;
    const maxAttempts = 10; // Adjust as needed

    const checkStatus = async () => {
      try {
        const status = await getRawTransactionStatus({ order_id: orderId });
        setTxnStatus(status);

        if (status.jobs[0].status === "RUNNING" && attempts < maxAttempts) {
          attempts++;
          setTimeout(checkStatus, 5000); // Check again after 5 seconds
        } else {
          setIsCheckingStatus(false);
        }
      } catch (e) {
        console.error(e);
        alert("Error while fetching transaction status");
        setIsCheckingStatus(false);
      }
    };

    checkStatus();
  };
  const getStatusMessage = (status: string) => {
    switch (status) {
      case "RUNNING":
        return "Transaction is being processed...";
      case "COMPLETED":
        return "Transaction completed successfully!";
      case "FAILED":
        return "Transaction failed. Please try again.";
      default:
        return "Unknown status";
    }
  };

  const balance = tokenBalances
    ? tokenBalances.tokens.find((x) => x.name === baseAsset.name)?.balance
    : 0;

  useEffect(() => {
    if (!baseAmount || !publicKey) return;
    setFetchingQuote(true);
    axios
      .get(
        `https://quote-api.jup.ag/v6/quote?inputMint=${
          baseAsset.mint
        }&outputMint=${quoteAsset.mint}&amount=${
          Number(baseAmount) * 10 ** baseAsset.decimals
        }&slippageBps=50`
      )
      .then((res) => {
        setQuoteAmount(
          (
            Number(res.data.outAmount) / Number(10 ** quoteAsset.decimals)
          ).toString()
        );
        setFetchingQuote(false);
        setQuoteResponse(res.data);
      })
      .catch(() => {
        setFetchingQuote(false);
      });
  }, [baseAsset, quoteAsset, baseAmount, publicKey]);

  const handleSwap = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }
    try {
      if (!quoteResponse) {
        alert("No quote response available");
        return;
      }

      // Fetch raw transaction data from the API
      const { data } = await axios.post("/api/swap", {
        quoteResponse,
        publicKey,
      });
      console.log("SWAP DATA", data);

      // Convert the rawTransaction object to a Uint8Array
      const rawTransactionArray = new Uint8Array(
        Object.values(data.rawTransaction)
      );

      // Execute the raw transaction using Okto SDK
      const result = await executeRawTransaction({
        network_name: "SOLANA_DEVNET",
        transaction: rawTransactionArray,
      });

      if (result.jobId) {
        setOrderId(result.jobId);
        alert("Swap transaction submitted!");
      }
    } catch (e) {
      console.error(e);
      alert("Error while sending the transaction");
    }
  };

  const txnStatusDisplay = txnStatus
    ? JSON.stringify(txnStatus, null, 2)
    : "No status available";

  return (
    <div className="p-12">
      <div className="text-2xl font-bold pb-4 w-1/2">Swap Tokens</div>
      <SwapInputRow
        amount={baseAmount}
        onAmountChange={(value: string) => setBaseAmount(value)}
        onSelect={(asset: TokenDetails) => setBaseAsset(asset)}
        selectedToken={baseAsset}
        title={"You pay:"}
        topBorderEnabled={true}
        bottomBorderEnabled={false}
        subtitle={
          <div className="text-slate-500 pt-1 text-sm pl-1 flex">
            <div className="font-normal pr-1">Current Balance:</div>
            <div className="font-semibold">
              {balance} {baseAsset.name}
            </div>
          </div>
        }
      />
      <div className="flex justify-center">
        <div
          onClick={() => {
            let baseAssetTemp = baseAsset;
            setBaseAsset(quoteAsset);
            setQuoteAsset(baseAssetTemp);
          }}
          className="cursor-pointer rounded-full w-10 h-10 border absolute mt-[-20px]  flex justify-center pt-2"
        >
          <ArrowDownUp />
        </div>
      </div>
      <SwapInputRow
        inputLoading={fetchingQuote}
        inputDisabled={true}
        amount={quoteAmount}
        onSelect={(asset) => setQuoteAsset(asset)}
        selectedToken={quoteAsset}
        title={"You receive"}
        topBorderEnabled={false}
        bottomBorderEnabled={true}
      />
      <div className="flex justify-end py-6">
        <Button onClick={handleSwap} disabled={!publicKey}>
          {publicKey ? "Swap" : "Connect Wallet"}
        </Button>
      </div>
      <Input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.currentTarget.value)}
        placeholder="Enter Order ID"
      />
      {txnStatus && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Transaction Status:</h3>
          <p className="mb-2">{getStatusMessage(txnStatus.jobs[0].status)}</p>
          {txnStatus.jobs[0].transaction_hash && (
            <p className="mb-4">
              <span className="font-medium">Transaction Hash:</span>{" "}
              {txnStatus.jobs[0].transaction_hash}
            </p>
          )}
        </div>
      )}
      <div className="mt-6">
        <Button
          onClick={checkOrderStatus}
          disabled={isCheckingStatus}
          className=" py-3 text-lg"
        >
          {isCheckingStatus ? "Checking Status..." : "Check Order Status"}
        </Button>
      </div>{" "}
    </div>
  );
}

function SwapInputRow({
  onSelect,
  amount,
  onAmountChange,
  selectedToken,
  title,
  subtitle,
  topBorderEnabled,
  bottomBorderEnabled,
  inputDisabled,
  inputLoading,
}: {
  onSelect: (asset: TokenDetails) => void;
  selectedToken: TokenDetails;
  title: string;
  subtitle?: React.ReactNode;
  topBorderEnabled: boolean;
  bottomBorderEnabled: boolean;
  amount?: string;
  onAmountChange?: (value: string) => void;
  inputDisabled?: boolean;
  inputLoading?: boolean;
}) {
  return (
    <div
      className={`border flex justify-between p-6  ${
        topBorderEnabled ? "rounded-t-xl" : ""
      } ${bottomBorderEnabled ? "rounded-b-xl" : ""}`}
    >
      <div>
        <div className="text-xs font-semibold mb-1">{title}</div>
        <AssetSelector selectedToken={selectedToken} onSelect={onSelect} />
        {subtitle}
      </div>
      <div>
        <input
          disabled={inputDisabled}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder="0"
          type="text"
          className=" p-6 outline-none text-4xl"
          dir="rtl"
          value={inputLoading ? "Loading" : amount}
        />
      </div>
    </div>
  );
}

function AssetSelector({
  selectedToken,
  onSelect,
}: {
  selectedToken: TokenDetails;
  onSelect: (asset: TokenDetails) => void;
}) {
  return (
    <div className="w-full">
      <select
        onChange={(e) => {
          const selectedToken = SUPPORTED_TOKENS.find(
            (x: TokenDetails) => x.name === e.target.value
          );
          if (selectedToken) {
            onSelect(selectedToken);
          }
        }}
        id="countries"
        className=" border ext-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {SUPPORTED_TOKENS.map((token: TokenDetails) => (
          <option key={token.name} selected={selectedToken.name === token.name}>
            {token.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function SwappingPage() {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const { getWallets, getPortfolio } = useOkto() as OktoContextType;
  const { data: walletsData, isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  const solanaWallet = walletsData?.wallets.find(
    (wallet) => wallet.network_name === "SOLANA_DEVNET"
  );

  useEffect(() => {
    if (solanaWallet) {
      setPublicKey(solanaWallet.address);
    }
  }, [solanaWallet]);

  const { tokenBalances, loading, error } = useTokens(publicKey);

  if (isLoading || loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching token balances</div>;

  return <Swap tokenBalances={tokenBalances} publicKey={publicKey} />;
}
