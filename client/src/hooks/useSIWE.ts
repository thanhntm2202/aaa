import { useState, useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

export function useSIWE() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSigning, setIsSigning] = useState(false);
  
  // Get current user from auth
  const { data: user } = trpc.auth.me.useQuery();

  const signIn = useCallback(async () => {
    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return false;
    }

    try {
      setIsSigning(true);

      // Get nonce from backend
      const nonceResponse = await fetch('/api/siwe/nonce');
      if (!nonceResponse.ok) {
        throw new Error('Failed to get nonce');
      }
      const { nonce } = await nonceResponse.json();

      // Create SIWE message
      const message = `FAPEX wants you to sign in with your Ethereum account:\n${address}\n\nClick to sign in and accept the Terms of Service\n\nURI: ${window.location.origin}\nVersion: 1\nChain ID: 1\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

      // Sign message
      const signature = await signMessageAsync({
        message,
      });

      // Verify signature on backend
      const verifyResponse = await fetch('/api/siwe/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          signature,
          address,
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Signature verification failed');
      }

      toast.success('Successfully signed in with Ethereum!');
      return true;
    } catch (error) {
      console.error('SIWE error:', error);
      toast.error('Failed to sign in with Ethereum');
      return false;
    } finally {
      setIsSigning(false);
    }
  }, [isConnected, address, signMessageAsync]);

  return {
    signIn,
    isSigning,
    isAuthenticated: !!user,
    user,
  };
}
