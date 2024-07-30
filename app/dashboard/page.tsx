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
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const { getPortfolio, orderHistory } = useOkto() as OktoContextType;

  useEffect(() => {
    getPortfolio()
      .then((result) => {
        console.log(result);
        setPortfolio(Array.isArray(result) ? result : []); // Ensure result is an array
      })
      .catch((error) => {
        console.error(error);
        setPortfolio([]); // Set an empty array in case of error
      });

    orderHistory({})
      .then((result) => {
        console.log("order history", result);
        setJobs(result.jobs || []); // Set the jobs array
        setTotalTransactions(result.total || 0); // Set the total number of transactions
      })
      .catch((error) => {
        console.error(`order history error:`, error);
        setJobs([]); // Set an empty array in case of error
        setTotalTransactions(0); // Set total transactions to 0 in case of error
      });
  }, [getPortfolio, orderHistory]);

  const totalEarningsInINR = portfolio.reduce((acc: any, token: any) => {
    return acc + parseFloat(token.quantity);
  }, 0);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="max-w-6xl w-full mx-auto grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-[#7928CA] to-[#FF0080] text-white">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="text-sm font-medium">Total Earnings</div>
              <div className="text-3xl font-bold">Rs. {totalEarningsInINR}</div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-r from-[#0072F5] to-[#00DAC6] text-white">
            <CardHeader className="flex flex-col items-start gap-2">
              <div className="text-sm font-medium">Total Earnings</div>
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
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <WalletIcon className="w-8 h-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Wallet Balances</CardTitle>
                <CardDescription>Connected wallets</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>0x123...abc</TableCell>
                    <TableCell>Ethereum</TableCell>
                    <TableCell>$15,432.78</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0x456...def</TableCell>
                    <TableCell>Polygon</TableCell>
                    <TableCell>$5,000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0x789...ghi</TableCell>
                    <TableCell>Solana</TableCell>
                    <TableCell>$3,000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0xabc...def</TableCell>
                    <TableCell>Avalanche</TableCell>
                    <TableCell>$2,500.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <ActivityIcon className="w-8 h-8 text-primary" />
              <div className="grid gap-1">
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Last 5 transactions</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Network</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>2023-05-12</TableCell>
                    <TableCell>Ethereum</TableCell>
                    <TableCell>Deposit</TableCell>
                    <TableCell>$1,000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-10</TableCell>
                    <TableCell>Polygon</TableCell>
                    <TableCell>Withdrawal</TableCell>
                    <TableCell>$500.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-08</TableCell>
                    <TableCell>Solana</TableCell>
                    <TableCell>Staking</TableCell>
                    <TableCell>$200.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-05</TableCell>
                    <TableCell>Avalanche</TableCell>
                    <TableCell>Yield Farming</TableCell>
                    <TableCell>$300.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2023-05-01</TableCell>
                    <TableCell>Binance Chain</TableCell>
                    <TableCell>Deposit</TableCell>
                    <TableCell>$1,500.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
