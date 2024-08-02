"use client";

import React, { useState } from "react";
import { useOkto, type OktoContextType } from "okto-sdk-react";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Token {
  network_name: string;
  token_address: string;
  token_name: string;
  quantity: string;
}

interface Portfolio {
  tokens: Token[];
}

export default function TransferPage() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const { transferTokens, getPortfolio } = useOkto() as OktoContextType;

  const { data: portfolioData, isLoading } = useQuery<Portfolio>({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  const handleTransfer = async () => {
    if (!selectedToken || !recipientAddress || !amount) return;

    try {
      const result = await transferTokens({
        network_name: selectedToken.network_name,
        token_address: selectedToken.token_address
          ? selectedToken.token_address
          : " ",
        recipient_address: recipientAddress,
        quantity: amount,
      });
      console.log("Transfer success", result);
      setIsConfirming(false);
      // Reset form or show success message
    } catch (error) {
      console.log("Transfer error", error);
      // Show error message
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold mb-6">Transfer Assets</h1>
      <div className="grid gap-4 max-w-md">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="token" className="text-right">
            Token
          </Label>
          <Select
            onValueChange={(value) =>
              setSelectedToken(
                portfolioData?.tokens.find((t) => t.token_name === value) ||
                  null
              )
            }
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select token" />
            </SelectTrigger>
            <SelectContent>
              {portfolioData?.tokens.map((token) => (
                <SelectItem key={token.token_name} value={token.token_name}>
                  {token.token_name} ({token.quantity})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
            Amount
          </Label>
          <Input
            id="amount"
            className="col-span-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="recipient" className="text-right">
            Recipient
          </Label>
          <Input
            id="recipient"
            className="col-span-3"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsConfirming(true)} className="mt-4">
          Transfer
        </Button>
      </div>

      <Dialog open={isConfirming} onOpenChange={() => setIsConfirming(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              You are about to send {amount} {selectedToken?.token_name} to{" "}
              {recipientAddress}. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsConfirming(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleTransfer}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
