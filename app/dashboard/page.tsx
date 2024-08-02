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
import { Badge } from "@/components/ui/badge";
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
  const {
    getPortfolio,
    orderHistory,
    getSupportedNetworks,
    getSupportedTokens,
    getWallets,
  } = useOkto() as OktoContextType;

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

  const { data: walletsData, isLoading } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  });

  const { data: networksData, isLoading: networksLoading } = useQuery({
    queryKey: ["supportedNetworks"],
    queryFn: getSupportedNetworks,
  });

  const { data: tokensData, isLoading: tokensLoading } = useQuery({
    queryKey: ["supportedTokens"],
    queryFn: getSupportedTokens,
  });

  const recentTransactions = orderHistoryData?.jobs || [];

  const totalEarningsInINR = portfolio.reduce((acc, token) => {
    return acc + parseFloat(token.quantity);
  }, 0);

  const totalTransactions = orderHistoryJobs?.totalTransactions;

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="max-w-6xl w-full mx-auto grid gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Supported Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {networksData?.network?.map((network) => (
                  <div
                    key={network.network_name}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                    <span className="font-medium">{network.network_name}</span>
                    <Badge variant="outline">{network.chain_id}</Badge>
                  </div>
                )) || <div>No networks available</div>}
              </div>
            </CardContent>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Supported Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token Name</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Token Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokensData?.tokens?.map((token, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {token.token_name}
                      </TableCell>
                      <TableCell>{token.network_name}</TableCell>
                      <TableCell
                        className="truncate max-w-xs"
                        title={token.token_address}
                      >
                        {token.token_address || "Native Token"}
                      </TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={3}>No tokens available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Your Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Network</TableHead>
                    <TableHead>Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walletsData?.wallets?.map((wallet) => (
                    <TableRow key={wallet.address}>
                      <TableCell>{wallet.network_name}</TableCell>
                      <TableCell className="font-mono">
                        {wallet.address}
                      </TableCell>
                    </TableRow>
                  )) || (
                    <TableRow>
                      <TableCell colSpan={3}>No wallets available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
