import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: string;
  dueDate: string;
  status: "pending" | "in_progress" | "completed";
}

interface MilestoneProgressProps {
  milestones: Milestone[];
  title?: string;
}

export function MilestoneProgress({ milestones, title = "Milestones" }: MilestoneProgressProps) {
  const completed = milestones.filter((m) => m.status === "completed").length;
  const total = milestones.length;
  const progress = (completed / total) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {title}
          <span className="text-sm font-normal text-muted-foreground">
            {completed} of {total} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-card rounded-full h-2 border border-border/50 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-3">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="flex items-start gap-4 p-3 rounded-lg bg-card/50 border border-border/30 hover:border-border/50 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(milestone.status)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-sm">{milestone.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                  {getStatusBadge(milestone.status)}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-accent">${milestone.amount}</span>
                  <span>Due: {milestone.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
