import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { Scale, AlertCircle, CheckCircle, Clock, Vote, FileText } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { TxStatusModal } from "@/components/TxStatusModal";

const mockDisputes = [
  {
    id: 1,
    jobTitle: "Smart Contract Audit",
    client: "TechCorp",
    freelancer: "Alex Johnson",
    budget: "5000",
    status: "OPEN" as const,
    createdAt: "2024-06-10",
    evidence: {
      client: "ipfs://QmXxxx/client_evidence.pdf",
      freelancer: "ipfs://QmYyyy/freelancer_evidence.pdf",
    },
    description: "Client claims deliverable does not meet specifications",
  },
  {
    id: 2,
    jobTitle: "Web3 Frontend",
    client: "StartupXYZ",
    freelancer: "Jane Smith",
    budget: "3500",
    status: "VOTING" as const,
    createdAt: "2024-06-05",
    evidence: {
      client: "ipfs://QmZzzz/client_evidence.pdf",
      freelancer: "ipfs://QmWwww/freelancer_evidence.pdf",
    },
    description: "Disagreement over project scope and deliverables",
  },
  {
    id: 3,
    jobTitle: "NFT Marketplace",
    client: "NFTStudio",
    freelancer: "Bob Chen",
    budget: "7500",
    status: "RESOLVED" as const,
    createdAt: "2024-05-28",
    evidence: {
      client: "ipfs://QmAaaa/client_evidence.pdf",
      freelancer: "ipfs://QmBbbb/freelancer_evidence.pdf",
    },
    description: "Payment dispute resolved in favor of freelancer",
    resolution: "FREELANCER_WIN",
  },
];

export default function ArbitratorDashboard() {
  const [selectedDispute, setSelectedDispute] = useState<number | null>(null);
  const [vote, setVote] = useState<"client" | "freelancer" | null>(null);
  const [txStatus, setTxStatus] = useState<"pending" | "success" | "failed" | null>(null);

  const stats = [
    { label: "Open Disputes", value: "3", icon: AlertCircle, color: "text-red-500" },
    { label: "Voting", value: "2", icon: Vote, color: "text-yellow-500" },
    { label: "Resolved", value: "15", icon: CheckCircle, color: "text-green-500" },
    { label: "Avg Resolution", value: "4.2d", icon: Clock, color: "text-primary" },
  ];

  const handleSubmitVote = () => {
    setTxStatus("pending");
    setTimeout(() => {
      setTxStatus("success");
      setSelectedDispute(null);
      setVote(null);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "VOTING":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "RESOLVED":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Scale className="w-10 h-10 text-primary" />
            Arbitrator Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Review and resolve disputes</p>
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
        <Tabs defaultValue="open" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="open">Open Disputes</TabsTrigger>
            <TabsTrigger value="voting">Voting</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          {/* Open Disputes */}
          <TabsContent value="open">
            <div className="space-y-4">
              {mockDisputes
                .filter((d) => d.status === "OPEN")
                .map((dispute) => (
                  <Card key={dispute.id} className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{dispute.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {dispute.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Client</p>
                          <p className="font-semibold">{dispute.client}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Freelancer</p>
                          <p className="font-semibold">{dispute.freelancer}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="font-semibold text-accent">${dispute.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Created</p>
                          <p className="font-semibold">{dispute.createdAt}</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => setSelectedDispute(dispute.id)}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              View Evidence
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Dispute Evidence - {dispute.jobTitle}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Client Evidence</h4>
                                <a
                                  href={`https://gateway.pinata.cloud/ipfs/${dispute.evidence.client.split("://")[1]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm"
                                >
                                  {dispute.evidence.client}
                                </a>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Freelancer Evidence</h4>
                                <a
                                  href={`https://gateway.pinata.cloud/ipfs/${dispute.evidence.freelancer.split("://")[1]}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm"
                                >
                                  {dispute.evidence.freelancer}
                                </a>
                              </div>
                              <div className="pt-4 border-t border-border/50">
                                <p className="text-sm text-muted-foreground mb-3">
                                  {dispute.description}
                                </p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              className="flex-1 bg-primary hover:bg-primary/90"
                              onClick={() => setSelectedDispute(dispute.id)}
                            >
                              <Vote className="w-4 h-4 mr-2" />
                              Start Voting
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Cast Your Vote</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-4 bg-card rounded-lg border border-border/50">
                                <p className="text-sm text-muted-foreground mb-2">Dispute</p>
                                <p className="font-semibold">{dispute.jobTitle}</p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium">Vote for:</p>
                                <div className="grid grid-cols-2 gap-3">
                                  <Button
                                    variant={vote === "client" ? "default" : "outline"}
                                    onClick={() => setVote("client")}
                                    className={vote === "client" ? "bg-primary hover:bg-primary/90" : ""}
                                  >
                                    {dispute.client}
                                  </Button>
                                  <Button
                                    variant={vote === "freelancer" ? "default" : "outline"}
                                    onClick={() => setVote("freelancer")}
                                    className={vote === "freelancer" ? "bg-primary hover:bg-primary/90" : ""}
                                  >
                                    {dispute.freelancer}
                                  </Button>
                                </div>
                              </div>

                              <div className="pt-4 border-t border-border/50 flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleSubmitVote}
                                  disabled={!vote}
                                  className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50"
                                >
                                  Submit Vote
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

          {/* Voting */}
          <TabsContent value="voting">
            <div className="space-y-4">
              {mockDisputes
                .filter((d) => d.status === "VOTING")
                .map((dispute) => (
                  <Card key={dispute.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{dispute.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {dispute.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Client</p>
                          <p className="font-semibold">{dispute.client}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Freelancer</p>
                          <p className="font-semibold">{dispute.freelancer}</p>
                        </div>
                      </div>

                      <div className="pt-4 text-sm text-muted-foreground">
                        <p>Voting in progress... Results will be available soon.</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Resolved */}
          <TabsContent value="resolved">
            <div className="space-y-4">
              {mockDisputes
                .filter((d) => d.status === "RESOLVED")
                .map((dispute) => (
                  <Card key={dispute.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg">{dispute.jobTitle}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {dispute.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(dispute.status)}>
                          {dispute.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Client</p>
                          <p className="font-semibold">{dispute.client}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Freelancer</p>
                          <p className="font-semibold">{dispute.freelancer}</p>
                        </div>
                      </div>

                      <div className="pt-4">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {dispute.resolution === "FREELANCER_WIN"
                            ? `${dispute.freelancer} Wins`
                            : `${dispute.client} Wins`}
                        </Badge>
                      </div>
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
