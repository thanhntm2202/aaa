import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { Plus, DollarSign, Users, TrendingUp, CheckCircle } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TxStatusModal } from "@/components/TxStatusModal";

// Mock data
const mockJobs = [
  {
    id: 1,
    title: "Smart Contract Audit",
    description: "Security audit for our DeFi protocol",
    budget: "5000",
    status: "IN_PROGRESS" as const,
    freelancer: "Alex Johnson",
    bidsCount: 12,
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    title: "Web3 Frontend",
    description: "React frontend with wagmi integration",
    budget: "3500",
    status: "OPEN" as const,
    freelancer: null,
    bidsCount: 8,
    createdAt: "2024-06-05",
  },
  {
    id: 3,
    title: "NFT Marketplace",
    description: "NFT marketplace smart contracts",
    budget: "7500",
    status: "SUBMITTED" as const,
    freelancer: "Sarah Chen",
    bidsCount: 15,
    createdAt: "2024-05-15",
  },
];

const mockBids = [
  {
    id: 1,
    jobId: 2,
    freelancer: "John Doe",
    rate: "3200",
    proposal: "I have 5 years of React experience and have worked with wagmi before.",
    status: "PENDING",
  },
  {
    id: 2,
    jobId: 2,
    freelancer: "Jane Smith",
    rate: "3500",
    proposal: "Expert in Web3 development with proven track record.",
    status: "PENDING",
  },
];

export default function ClientDashboard() {
  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const [txStatus, setTxStatus] = useState<"pending" | "success" | "failed" | null>(null);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    budget: "",
    skills: "",
  });

  const stats = [
    { label: "Active Jobs", value: "3", icon: TrendingUp, color: "text-primary" },
    { label: "Total Spent", value: "$16,000", icon: DollarSign, color: "text-accent" },
    { label: "Completed", value: "12", icon: CheckCircle, color: "text-green-500" },
    { label: "Pending Bids", value: "2", icon: Users, color: "text-secondary" },
  ];

  const handleCreateJob = async () => {
    setTxStatus("pending");
    setTimeout(() => {
      setTxStatus("success");
      setIsCreateJobOpen(false);
      setNewJob({ title: "", description: "", budget: "", skills: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-bold">FAPEX</span>
            </a>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Client Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your jobs and freelancers</p>
          </div>
          <Dialog open={isCreateJobOpen} onOpenChange={setIsCreateJobOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Job Title</label>
                  <Input
                    placeholder="e.g., Smart Contract Audit"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob({ ...newJob, title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe the job in detail..."
                    value={newJob.description}
                    onChange={(e) =>
                      setNewJob({ ...newJob, description: e.target.value })
                    }
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Budget (USDC)</label>
                    <Input
                      type="number"
                      placeholder="5000"
                      value={newJob.budget}
                      onChange={(e) =>
                        setNewJob({ ...newJob, budget: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Required Skills</label>
                    <Input
                      placeholder="Solidity, Web3, React"
                      value={newJob.skills}
                      onChange={(e) =>
                        setNewJob({ ...newJob, skills: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateJobOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateJob}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Create Job
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="bids">Pending Bids</TabsTrigger>
            <TabsTrigger value="active">Active Work</TabsTrigger>
          </TabsList>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <Card key={job.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {job.description}
                        </p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-semibold text-accent">${job.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Bids</p>
                          <p className="font-semibold">{job.bidsCount}</p>
                        </div>
                        {job.freelancer && (
                          <div>
                            <p className="text-xs text-muted-foreground">Freelancer</p>
                            <p className="font-semibold">{job.freelancer}</p>
                          </div>
                        )}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bids Tab */}
          <TabsContent value="bids">
            <div className="space-y-4">
              {mockBids.map((bid) => (
                <Card key={bid.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold">{bid.freelancer}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {bid.proposal}
                        </p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        ${bid.rate}
                      </Badge>
                    </div>
                    <div className="flex gap-2 justify-end pt-4 border-t border-border/50">
                      <Button variant="outline" size="sm">
                        Reject
                      </Button>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Accept Bid
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Work Tab */}
          <TabsContent value="active">
            <div className="space-y-4">
              {mockJobs
                .filter((job) => job.status === "IN_PROGRESS" || job.status === "SUBMITTED")
                .map((job) => (
                  <Card key={job.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{job.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Freelancer: {job.freelancer}
                          </p>
                        </div>
                        <StatusBadge status={job.status} />
                      </div>
                      {job.status === "SUBMITTED" && (
                        <div className="pt-4 border-t border-border/50">
                          <p className="text-sm font-medium mb-3">Review Deliverable</p>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Request Changes
                            </Button>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve & Release Payment
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Transaction Status Modal */}
      <TxStatusModal
        isOpen={txStatus !== null}
        status={txStatus}
        onClose={() => setTxStatus(null)}
      />
    </div>
  );
}
