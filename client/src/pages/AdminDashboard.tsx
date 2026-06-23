import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Users, AlertCircle, TrendingUp, FileText, Download, Search } from "lucide-react";
import { Link } from "wouter";

// Mock data
const mockStats = {
  totalUsers: 1234,
  totalJobs: 567,
  totalDisputes: 23,
  platformFees: "45.2",
};

const mockDisputes = [
  {
    id: 1,
    jobTitle: "Smart Contract Audit",
    client: "TechCorp",
    freelancer: "John Dev",
    status: "OPEN",
    amount: "2000",
    createdAt: "2 days ago",
  },
  {
    id: 2,
    jobTitle: "Web3 Frontend",
    client: "StartupXYZ",
    freelancer: "Jane Dev",
    status: "OPEN",
    amount: "1500",
    createdAt: "1 day ago",
  },
];

const mockUsers = [
  {
    id: 1,
    name: "TechCorp",
    role: "Client",
    joinedAt: "Jan 15, 2024",
    reputation: 4.8,
    jobsPosted: 12,
  },
  {
    id: 2,
    name: "John Dev",
    role: "Freelancer",
    joinedAt: "Dec 20, 2023",
    reputation: 4.9,
    jobsCompleted: 28,
  },
];

const mockChartData = [
  { date: "Jan 1", jobs: 120, disputes: 2, earnings: 5000 },
  { date: "Jan 2", jobs: 145, disputes: 1, earnings: 6200 },
  { date: "Jan 3", jobs: 167, disputes: 3, earnings: 7100 },
  { date: "Jan 4", jobs: 189, disputes: 2, earnings: 8300 },
  { date: "Jan 5", jobs: 210, disputes: 4, earnings: 9200 },
];

const mockLogs = [
  { id: 1, event: "Job Created", user: "TechCorp", timestamp: "2 mins ago", status: "success" },
  { id: 2, event: "Bid Submitted", user: "John Dev", timestamp: "5 mins ago", status: "success" },
  { id: 3, event: "Dispute Raised", user: "StartupXYZ", timestamp: "15 mins ago", status: "warning" },
  { id: 4, event: "Payment Released", user: "Jane Dev", timestamp: "1 hour ago", status: "success" },
];

export default function AdminDashboard() {
  const [searchUser, setSearchUser] = useState("");

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform management and monitoring</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{mockStats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                  <p className="text-3xl font-bold text-foreground">{mockStats.totalJobs}</p>
                </div>
                <FileText className="w-8 h-8 text-secondary opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Disputes</p>
                  <p className="text-3xl font-bold text-foreground">{mockStats.totalDisputes}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-base">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Platform Fees</p>
                  <p className="text-3xl font-bold text-foreground">${mockStats.platformFees}K</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="logs">Event Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Charts */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="jobs" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="disputes" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="card-base">
              <CardHeader>
                <CardTitle>Earnings Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "0.5rem",
                      }}
                    />
                    <Bar dataKey="earnings" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-4">
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Open Disputes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDisputes.map((dispute) => (
                    <Link key={dispute.id} href={`/disputes/${dispute.id}`}>
                      <div className="p-4 bg-background/50 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{dispute.jobTitle}</p>
                            <p className="text-sm text-muted-foreground">
                              {dispute.client} vs {dispute.freelancer}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-destructive/20 text-destructive mb-2">
                              {dispute.status}
                            </Badge>
                            <p className="text-sm font-semibold text-foreground">${dispute.amount}</p>
                            <p className="text-xs text-muted-foreground">{dispute.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card className="card-base">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Search users..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="input-base flex-1"
                  />
                  <Button variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="p-4 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.role} • Joined {user.joinedAt}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">⭐ {user.reputation}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.role === "Client" ? `${user.jobsPosted} jobs posted` : `${user.jobsCompleted} jobs completed`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Event Logs Tab */}
          <TabsContent value="logs" className="space-y-4">
            <Card className="card-base">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Event Logs</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border text-sm">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{log.event}</p>
                        <p className="text-xs text-muted-foreground">{log.user}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={
                            log.status === "success"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }
                        >
                          {log.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground w-20 text-right">{log.timestamp}</p>
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
