import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Award } from "lucide-react";

interface ReputationScoreProps {
  score: number;
  totalReviews: number;
  completedJobs: number;
  successRate: number;
  compact?: boolean;
}

export function ReputationScore({
  score,
  totalReviews,
  completedJobs,
  successRate,
  compact = false,
}: ReputationScoreProps) {
  const getScoreBadgeColor = (score: number) => {
    if (score >= 4.5) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (score >= 4.0) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (score >= 3.5) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4.5) return "Excellent";
    if (score >= 4.0) return "Very Good";
    if (score >= 3.5) return "Good";
    return "Fair";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-accent text-accent" />
          <span className="font-bold text-sm">{score.toFixed(1)}</span>
        </div>
        <span className="text-xs text-muted-foreground">({totalReviews})</span>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Main Score */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Overall Rating</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(score)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold">{score.toFixed(1)}</span>
              </div>
            </div>
            <Badge className={getScoreBadgeColor(score)}>
              {getScoreLabel(score)}
            </Badge>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Award className="w-4 h-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">{totalReviews}</p>
              <p className="text-xs text-muted-foreground">Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-accent" />
              </div>
              <p className="text-2xl font-bold">{completedJobs}</p>
              <p className="text-xs text-muted-foreground">Jobs Done</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{successRate}%</p>
              <p className="text-xs text-muted-foreground">Success</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="pt-4 border-t border-border/50 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Score Breakdown</p>
            <div className="space-y-2">
              {[
                { label: "Quality", value: 4.8 },
                { label: "Communication", value: 4.7 },
                { label: "Timeliness", value: 4.9 },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-card rounded-full border border-border/50 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full"
                        style={{ width: `${(item.value / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-8">{item.value.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
