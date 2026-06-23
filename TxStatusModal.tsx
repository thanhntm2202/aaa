import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

type TxStatus = "pending" | "success" | "failed" | null;

interface TxStatusModalProps {
  isOpen: boolean;
  status: TxStatus;
  txHash?: string;
  error?: string;
  onClose: () => void;
  onRetry?: () => void;
}

export function TxStatusModal({
  isOpen,
  status,
  txHash,
  error,
  onClose,
  onRetry,
}: TxStatusModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {status === "pending" && "Processing Transaction"}
            {status === "success" && "Transaction Successful"}
            {status === "failed" && "Transaction Failed"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          {status === "pending" && (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-center text-muted-foreground">
                Please wait while your transaction is being processed...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="w-12 h-12 text-green-500" />
              <p className="text-center text-foreground font-medium">
                Transaction completed successfully!
              </p>
              {txHash && (
                <div className="w-full bg-card p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline break-all"
                  >
                    {txHash}
                  </a>
                </div>
              )}
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="w-12 h-12 text-destructive" />
              <p className="text-center text-foreground font-medium">
                Transaction failed
              </p>
              {error && (
                <div className="w-full bg-destructive/10 p-3 rounded-lg">
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex gap-2 justify-end">
          {status !== "pending" && (
            <>
              {status === "failed" && onRetry && (
                <Button variant="outline" onClick={onRetry}>
                  Retry
                </Button>
              )}
              <Button onClick={onClose}>
                {status === "success" ? "Done" : "Close"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
