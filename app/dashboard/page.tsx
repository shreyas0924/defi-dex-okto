"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { ActivityIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import { OktoContextType, useOkto } from "okto-sdk-react";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { getPortfolio, orderHistory, getWallets } =
    useOkto() as OktoContextType;

  const { data: portfolio = [], isLoading: isPortfolioLoading } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    select: (data) => (Array.isArray(data) ? data : []),
  });
  const { data: portfolioTokens = { tokens: [] } } = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    select: (data) => data || { tokens: [] },
  });

  const { data: orderHistoryJobs, isLoading: isOrderJobsLoading } = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => orderHistory({}),
    select: (data) => ({
      jobs: data.jobs || [],
      totalTransactions: data.total || 0,
    }),
  });
  const { data: orderHistoryData, isLoading: isOrderHistoryLoading } = useQuery(
    {
      queryKey: ["orderHistory"],
      queryFn: () => orderHistory({}),
    }
  );
  const { data: walletsData } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  // const combinedWalletData = React.useMemo(() => {
  //   if (!walletsData?.wallets || !portfolio) return [];

  //   return walletsData.wallets.map((wallet) => {
  //     const portfolioItems = portfolio.filter(
  //       (item) => item.network_name === wallet.network_name
  //     );

  //     const balance = portfolioItems
  //       .reduce((total, item) => {
  //         return total + parseFloat(item.quantity);
  //       }, 0)
  //       .toFixed(8);

  //     return {
  //       ...wallet,
  //       balance: balance,
  //     };
  //   });
  // }, [walletsData, portfolio]);

  const recentTransactions = (orderHistoryData?.jobs || []).slice(0, 5);

  const totalEarningsInINR = portfolio.reduce((acc, token) => {
    return acc + parseFloat(token.quantity);
  }, 0);

  const totalTransactions = orderHistoryJobs?.totalTransactions;

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="max-w-6xl w-full mx-auto grid gap-8">
        {portfolio}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="text-sm font-medium">
                Total Earnings - Mainnet
              </div>
              <div className="text-3xl font-bold">Rs. {totalEarningsInINR}</div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-r from-[#0072F5] to-[#00DAC6] text-white">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="text-sm font-medium">
                Total Earnings - Testnet
              </div>
              <div className="text-3xl font-bold">Rs. {totalEarningsInINR}</div>
            </CardHeader>
          </Card>
          <Card className="bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="text-sm font-medium">Total Transactions</div>
              <div className="text-3xl font-bold">{totalTransactions}</div>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Staking</CardTitle>
              <CardDescription>
                Earn rewards by staking your crypto assets.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="BTC"
                      className="rounded-full"
                    />
                    <div>Bitcoin (BTC)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">5.2%</div>
                    <div className="text-sm text-muted-foreground">APY</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="ETH"
                      className="rounded-full"
                    />
                    <div>Ethereum (ETH)</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">6.8%</div>
                    <div className="text-sm text-muted-foreground">APY</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="USDC"
                      className="rounded-full"
                    />
                    <div>USDC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">4.2%</div>
                    <div className="text-sm text-muted-foreground">APY</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Stake Now</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Swap</CardTitle>
              <CardDescription>
                Exchange your digital assets seamlessly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="BTC"
                      className="rounded-full"
                    />
                    <div>BTC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$47,500</div>
                    <div className="text-sm text-muted-foreground">1 BTC</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="ETH"
                      className="rounded-full"
                    />
                    <div>ETH</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$3,000</div>
                    <div className="text-sm text-muted-foreground">0.5 ETH</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="/placeholder.svg"
                      width={32}
                      height={32}
                      alt="USDC"
                      className="rounded-full"
                    />
                    <div>USDC</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">$10,000</div>
                    <div className="text-sm text-muted-foreground">
                      10,000 USDC
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Swap Now</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1  gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <WalletIcon className="w-8 h-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Portfolio Balances</CardTitle>
                <CardDescription>Your current token holdings</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioTokens.tokens &&
                    portfolioTokens.tokens.map((token, index) => (
                      <TableRow key={index}>
                        <TableCell>{token.token_name}</TableCell>
                        <TableCell>{token.network_name}</TableCell>
                        <TableCell>{token.quantity}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ActivityIcon className="w-8 h-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Last {recentTransactions.length} transactions
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isOrderHistoryLoading ? (
                <p>Loading transactions...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Network</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Transaction Hash</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.order_id}>
                        <TableCell>
                          {transaction.order_id.slice(0, 15)}...
                        </TableCell>
                        <TableCell>{transaction.network_name}</TableCell>
                        <TableCell>{transaction.order_type}</TableCell>
                        <TableCell>{transaction.status}</TableCell>
                        <TableCell className="hover:underline underline-offset-2 cursor-pointer">
                          {" "}
                          {transaction.transaction_hash.slice(0, 15)}...
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
