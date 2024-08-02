"use client";
import { useState, useEffect } from "react";
import { useOkto, type OktoContextType } from "okto-sdk-react";

export interface TokenWithBalance {
  name: string;
  // address: string;
  balance: string;
}

export function useTokens(publicKey: string | null) {
  const [tokenBalances, setTokenBalances] = useState<{
    totalBalance: number;
    tokens: TokenWithBalance[];
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getPortfolio } = useOkto() as OktoContextType;

  useEffect(() => {
    const fetchTokenBalances = async () => {
      if (!publicKey) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getPortfolio();

        // Transform the data to match TokenWithBalance
        const updatedBalances = {
          totalBalance: response.total,
          tokens: response.tokens.map((token) => ({
            name: token.token_name,
            // address:
            //   token.token_name === "SOL_DEVNET" ? " " : token.token_address,
            balance: token.quantity,
          })),
        };

        setTokenBalances(updatedBalances);
      } catch (error) {
        console.error("Failed to fetch token balances:", error);
        setError("Failed to fetch token balances");
      } finally {
        setLoading(false);
      }
    };

    fetchTokenBalances();
  }, [publicKey, getPortfolio]);

  return { tokenBalances, loading, error };
}
