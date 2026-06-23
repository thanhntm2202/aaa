import { useAccount, useConnect, useDisconnect, useBalance, useChainId } from 'wagmi';
import { useCallback } from 'react';

export function useWeb3() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balanceData } = useBalance({
    address: account.address,
  });

  const connectWallet = useCallback(
    (connectorId?: string) => {
      const connector = connectorId
        ? connectors.find((c) => c.id === connectorId)
        : connectors[0];
      if (connector) {
        connect({ connector });
      }
    },
    [connectors, connect]
  );

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  return {
    // Account info
    address: account.address,
    isConnected: account.isConnected,
    isConnecting: account.isConnecting,
    isDisconnected: account.isDisconnected,
    status: account.status,
    
    // Wallet connection
    connectors,
    connectWallet,
    disconnectWallet,
    connectionStatus: status,
    connectionError: error,
    
    // Chain info
    chainId,
    
  // Balance
  balance: balanceData?.value,
  balanceSymbol: balanceData?.symbol,
  };
}
