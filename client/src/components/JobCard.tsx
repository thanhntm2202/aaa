import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./StatusBadge";
import { Briefcase, DollarSign, Calendar, User } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface JobCardProps {
  id: number;
  title: string;
  description: string;
  budget: string;
  deadline?: Date;
  skills: string[];
  status: "OPEN" | "ASSIGNED" | "IN_PROGRESS" | "SUBMITTED" | "COMPLETED" | "DISPUTED" | "CANCELLED";
  clientName?: string;
  bidsCount?: number;
  className?: string;
}

export function JobCard({
  id,
  title,
  description,
  budget,
  deadline,
  skills,
  status,
  clientName,
  bidsCount = 0,
  className,
}: JobCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Link href={`/jobs/${id}`}>
      <Card className={cn("hover-lift cursor-pointer group", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              {clientName && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {clientName}
                </p>
              )}
            </div>
            <StatusBadge status={status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>

          {/* Budget and Deadline */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-accent" />
                <span className="font-semibold text-sm">{budget} USDC</span>
              </div>
              {deadline && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(deadline)}
                </div>
              )}
            </div>
            {bidsCount > 0 && (
              <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                {bidsCount} bids
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              View Details
            </Button>
            {status === "OPEN" && (
              <Button
                size="sm"
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Apply Now
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
