import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { DollarSign, TrendingUp, CheckCircle, Star, Send } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TxStatusModal } from "@/components/TxStatusModal";

const mockAvailableJobs = [
  {
    id: 1,
    title: "Smart Contract Audit",
    budget: "5000",
    skills: ["Solidity", "Security"],
    description: "Need experienced auditor for DeFi protocol",
    clientRating: 4.9,
  },
  {
    id: 2,
    title: "Web3 Frontend",
    budget: "3500",
    skills: ["React", "Web3"],
    description: "Build React frontend with wagmi",
    clientRating: 4.8,
  },
];

const mockActiveBids = [
  {
    id: 1,
    jobId: 1,
    title: "Smart Contract Audit",
    proposedRate: "4800",
    status: "PENDING",
    submittedAt: "2024-06-10",
  },
  {
    id: 2,
    jobId: 2,
    title: "Web3 Frontend",
    proposedRate: "3500",
    status: "ACCEPTED",
    submittedAt: "2024-06-08",
  },
];

const mockActiveJobs = [
  {
    id: 1,
    title: "Web3 Frontend Development",
    client: "StartupXYZ",
    budget: "3500",
    status: "IN_PROGRESS" as const,
    deadline: "2024-07-10",
    progress: 65,
  },
];

const mockEarnings = [
  { month: "June", amount: "8500" },
  { month: "May", amount: "6200" },
  { month: "April", amount: "7800" },
];

export default function FreelancerDashboard() {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [bidProposal, setBidProposal] = useState("");
  const [bidRate, setBidRate] = useState("");
  const [txStatus, setTxStatus] = useState<"pending" | "success" | "failed" | null>(null);

  const handleSubmitBid = () => {
    setTxStatus("pending");
    setTimeout(() => {
      setTxStatus("success");
      setSelectedJob(null);
      setBidProposal("");
      setBidRate("");
    }, 1500);
  };

  const stats = [
    { label: "Total Earned", value: "$22,500", icon: DollarSign, color: "text-accent" },
    { label: "Active Jobs", value: "1", icon: TrendingUp, color: "text-primary" },
    { label: "Completed", value: "24", icon: CheckCircle, color: "text-green-500" },
    { label: "Rating", value: "4.8", icon: Star, color: "text-yellow-500" },
  ];

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Freelancer Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your bids and earnings</p>
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
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="available">Available Jobs</TabsTrigger>
            <TabsTrigger value="bids">My Bids</TabsTrigger>
            <TabsTrigger value="active">Active Work</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Available Jobs */}
          <TabsContent value="available">
            <div className="space-y-4">
              {mockAvailableJobs.map((job) => (
                <Card key={job.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {job.description}
                        </p>
                      </div>
                      <Badge className="bg-accent/20 text-accent border-accent/30">
                        ${job.budget}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex gap-4">
                        <div className="flex gap-2">
                          {job.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          {job.clientRating}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => setSelectedJob(job.id)}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Submit Bid
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Submit Bid for {job.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Proposed Rate (USDC)</label>
                              <Input
                                type="number"
                                placeholder={job.budget}
                                value={bidRate}
                                onChange={(e) => setBidRate(e.target.value)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Your Proposal</label>
                              <Textarea
                                placeholder="Explain why you are the best fit for this job..."
                                value={bidProposal}
                                onChange={(e) => setBidProposal(e.target.value)}
                                className="mt-1"
                                rows={4}
                              />
                            </div>
                            <div className="flex gap-2 justify-end pt-4">
                              <Button variant="outline">Cancel</Button>
                              <Button
                                onClick={handleSubmitBid}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Submit Bid
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Bids */}
          <TabsContent value="bids">
            <div className="space-y-4">
              {mockActiveBids.map((bid) => (
                <Card key={bid.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold">{bid.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Submitted: {bid.submittedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-accent/20 text-accent border-accent/30">
                          ${bid.proposedRate}
                        </Badge>
                        <Badge
                          className={
                            bid.status === "ACCEPTED"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-primary/20 text-primary border-primary/30"
                          }
                        >
                          {bid.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Work */}
          <TabsContent value="active">
            <div className="space-y-4">
              {mockActiveJobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Client: {job.client}
                        </p>
                      </div>
                      <StatusBadge status={job.status} />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="font-semibold">{job.progress}%</span>
                      </div>
                      <div className="w-full bg-card rounded-full h-2 border border-border/50">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">Budget: {job.budget} USDC</span>
                        <span className="text-sm text-muted-foreground">Due: {job.deadline}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-border/50">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                        Submit Deliverable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Earnings */}
          <TabsContent value="earnings">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockEarnings.map((earning, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b border-border/50 last:border-0 last:pb-0">
                      <span className="font-medium">{earning.month}</span>
                      <span className="text-lg font-bold text-accent">${earning.amount}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold text-accent">$22,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
