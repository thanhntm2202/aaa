import React, { createContext, useContext, ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Create wagmi config using getDefaultConfig
const config = getDefaultConfig({
  appName: 'FAPEX - Blockchain Freelance Marketplace',
  projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID || 'default-project-id',
  chains: [mainnet, sepolia],
});

// Create a client
const queryClient = new QueryClient();

interface Web3ContextType {
  // Context for future Web3-specific state
  isReady: boolean;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Web3Context.Provider value={{ isReady: true }}>
            {children}
          </Web3Context.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useWeb3Context() {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3Context must be used within Web3Provider');
  }
  return context;
}
