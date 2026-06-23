import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { useWeb3 } from "@/hooks/useWeb3";

export function WalletConnectButton() {
  const { isConnected, address, balance, chainId, connectWallet } = useWeb3();
  const [showMenu, setShowMenu] = useState(false);

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatBalance = (bal: bigint | string | undefined) => {
    if (!bal) return "0.0000";
    const num = typeof bal === "bigint" ? Number(bal) / 1e18 : parseFloat(bal as string);
    return num.toFixed(4);
  };

  if (!isConnected) {
    return (
      <Button
        onClick={() => connectWallet()}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-card hover:bg-card/80 text-foreground border border-border flex items-center gap-2"
      >
        <div className="flex flex-col items-start">
          <span className="text-xs text-muted-foreground">Connected</span>
          <span className="text-sm font-semibold">{formatAddress(address || "")}</span>
        </div>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg z-50 p-4 space-y-3">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Wallet Address</p>
            <p className="text-sm font-mono break-all text-foreground">{address}</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Balance</p>
            <p className="text-sm font-semibold text-foreground">
              {formatBalance(balance || "0")} ETH
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Network</p>
            <p className="text-sm font-semibold text-foreground">
              {chainId === 11155111 ? "Sepolia Testnet" : `Chain ID: ${chainId}`}
            </p>
            {chainId !== 11155111 && (
              <p className="text-xs text-destructive font-semibold">
                ⚠️ Please switch to Sepolia testnet
              </p>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <Button
              onClick={() => {
                window.location.href = "/";
                setShowMenu(false);
              }}
              className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
