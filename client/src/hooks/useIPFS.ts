import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UploadResult {
  cid: string;
  hash: string;
  size: number;
}

export function useIPFS() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Calculate SHA256 hash of file
  const calculateFileHash = useCallback(async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }, []);

  // Upload file to IPFS via Pinata (using backend API)
  const uploadFile = useCallback(
    async (file: File): Promise<UploadResult | null> => {
      try {
        setIsUploading(true);
        setUploadProgress(0);

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);

        // Upload to backend endpoint (which will handle Pinata upload)
        const response = await fetch('/api/ipfs/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        
        // Calculate file hash for on-chain verification
        const fileHash = await calculateFileHash(file);

        setUploadProgress(100);
        
        return {
          cid: data.cid,
          hash: fileHash,
          size: file.size,
        };
      } catch (error) {
        console.error('IPFS upload error:', error);
        toast.error('Failed to upload file to IPFS');
        return null;
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [calculateFileHash]
  );

  // Upload multiple files
  const uploadMultipleFiles = useCallback(
    async (files: File[]): Promise<UploadResult[]> => {
      const results: UploadResult[] = [];
      
      for (const file of files) {
        const result = await uploadFile(file);
        if (result) {
          results.push(result);
        }
      }
      
      return results;
    },
    [uploadFile]
  );

  // Get IPFS gateway URL for a CID
  const getIPFSUrl = useCallback((cid: string): string => {
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  }, []);

  return {
    uploadFile,
    uploadMultipleFiles,
    calculateFileHash,
    getIPFSUrl,
    isUploading,
    uploadProgress,
  };
}
