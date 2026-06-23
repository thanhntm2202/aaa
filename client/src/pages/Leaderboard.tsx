import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, TrendingUp } from "lucide-react";

// Mock leaderboard data
const topFreelancers = [
  {
    rank: 1,
    name: "John Developer",
    address: "0x1234...5678",
    reputation: 4.95,
    jobsCompleted: 156,
    earnings: "245.5",
    badge: "🏆 Master",
  },
  {
    rank: 2,
    name: "Jane Smart",
    address: "0xabcd...ef01",
    reputation: 4.88,
    jobsCompleted: 142,
    earnings: "198.2",
    badge: "⭐ Expert",
  },
  {
    rank: 3,
    name: "Alex Code",
    address: "0x5678...9abc",
    reputation: 4.82,
    jobsCompleted: 128,
    earnings: "175.8",
    badge: "⭐ Expert",
  },
  {
    rank: 4,
    name: "Sam Blockchain",
    address: "0xdef0...1234",
    reputation: 4.75,
    jobsCompleted: 115,
    earnings: "152.3",
    badge: "✨ Pro",
  },
  {
    rank: 5,
    name: "Taylor Web3",
    address: "0x2345...6789",
    reputation: 4.68,
    jobsCompleted: 98,
    earnings: "128.5",
    badge: "✨ Pro",
  },
];

const topClients = [
  {
    rank: 1,
    name: "TechCorp",
    address: "0x9abc...def0",
    reputation: 4.92,
    jobsPosted: 45,
    totalSpent: "1250.5",
    badge: "🏆 Trusted",
  },
  {
    rank: 2,
    name: "StartupXYZ",
    address: "0x3456...7890",
    reputation: 4.85,
    jobsPosted: 38,
    totalSpent: "980.2",
    badge: "⭐ Verified",
  },
  {
    rank: 3,
    name: "InnovateLabs",
    address: "0x7890...1234",
    reputation: 4.78,
    jobsPosted: 32,
    totalSpent: "850.8",
    badge: "⭐ Verified",
  },
];

function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Medal className="w-5 h-5 text-orange-400" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
}

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState<"all" | "month" | "week">("all");

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground mt-1">Top performers on FAPEX platform</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="freelancers" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="freelancers">Top Freelancers</TabsTrigger>
            <TabsTrigger value="clients">Top Clients</TabsTrigger>
          </TabsList>

          {/* Freelancers Tab */}
          <TabsContent value="freelancers" className="space-y-4">
            {/* Timeframe Filter */}
            <div className="flex gap-2">
              <Button
                onClick={() => setTimeframe("week")}
                variant={timeframe === "week" ? "default" : "outline"}
                className={timeframe === "week" ? "bg-primary" : ""}
              >
                This Week
              </Button>
              <Button
                onClick={() => setTimeframe("month")}
                variant={timeframe === "month" ? "default" : "outline"}
                className={timeframe === "month" ? "bg-primary" : ""}
              >
                This Month
              </Button>
              <Button
                onClick={() => setTimeframe("all")}
                variant={timeframe === "all" ? "default" : "outline"}
                className={timeframe === "all" ? "bg-primary" : ""}
              >
                All Time
              </Button>
            </div>

            {/* Top 3 Highlight */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {topFreelancers.slice(0, 3).map((freelancer) => (
                <Card key={freelancer.rank} className="card-base relative overflow-hidden">
                  {freelancer.rank === 1 && (
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent" />
                  )}
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(freelancer.rank)}
                        <span className="text-sm text-muted-foreground">#{freelancer.rank}</span>
                      </div>
                      <Badge className="bg-primary/20 text-primary">{freelancer.badge}</Badge>
                    </div>
                    <p className="font-bold text-lg text-foreground">{freelancer.name}</p>
                    <p className="text-xs text-muted-foreground mb-3">{freelancer.address}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Reputation</span>
                        <span className="text-sm font-semibold text-foreground">⭐ {freelancer.reputation}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Jobs</span>
                        <span className="text-sm font-semibold text-foreground">{freelancer.jobsCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Earnings</span>
                        <span className="text-sm font-semibold text-primary">${freelancer.earnings}K</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full List */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Full Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topFreelancers.map((freelancer) => (
                    <div
                      key={freelancer.rank}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 w-12">
                          {getRankIcon(freelancer.rank)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{freelancer.name}</p>
                          <p className="text-xs text-muted-foreground">{freelancer.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">⭐ {freelancer.reputation}</p>
                          <p className="text-xs text-muted-foreground">{freelancer.jobsCompleted} jobs</p>
                        </div>
                        <div className="text-right min-w-24">
                          <Badge className="bg-primary/20 text-primary mb-1">{freelancer.badge}</Badge>
                          <p className="text-sm font-bold text-primary">${freelancer.earnings}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-4">
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Top Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topClients.map((client) => (
                    <div
                      key={client.rank}
                      className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex items-center gap-2 w-12">
                          {getRankIcon(client.rank)}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">⭐ {client.reputation}</p>
                          <p className="text-xs text-muted-foreground">{client.jobsPosted} jobs</p>
                        </div>
                        <div className="text-right min-w-24">
                          <Badge className="bg-secondary/20 text-secondary mb-1">{client.badge}</Badge>
                          <p className="text-sm font-bold text-secondary">${client.totalSpent}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
