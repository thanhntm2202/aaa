import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type JobStatus = "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED" | "DISPUTED" | "CANCELLED";

const statusConfig: Record<JobStatus, { label: string; className: string }> = {
  OPEN: {
    label: "Open",
    className: "badge-open",
  },
  ASSIGNED: {
    label: "Assigned",
    className: "badge-assigned",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "badge-in-progress",
  },
  SUBMITTED: {
    label: "Submitted",
    className: "badge-submitted",
  },
  COMPLETED: {
    label: "Completed",
    className: "badge-completed",
  },
  DISPUTED: {
    label: "Disputed",
    className: "badge-disputed",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
  },
};

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn("font-medium", config.className, className)}>
      {config.label}
    </Badge>
  );
}
