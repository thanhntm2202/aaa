import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, Clock, AlertCircle } from "lucide-react";
import { Link } from "wouter";

// Mock dispute data
const mockDispute = {
  id: 1,
  jobId: 1,
  jobTitle: "Smart Contract Audit for DeFi Protocol",
  status: "OPEN" as const,
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  clientName: "TechCorp",
  clientAddress: "0x1234...5678",
  freelancerName: "John Developer",
  freelancerAddress: "0xabcd...ef01",
  reason: "Deliverable does not meet specifications. The audit report is incomplete and missing critical security analysis.",
  clientEvidence: [
    { name: "audit_report.pdf", hash: "QmXxxx..." },
    { name: "specification.pdf", hash: "QmYyyy..." },
  ],
  freelancerEvidence: [
    { name: "response.pdf", hash: "QmZzzz..." },
  ],
  milestoneAmount: "2000",
  deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
};

export default function DisputeDetail() {
  const { id } = useParams();
  const [clientVote, setClientVote] = useState<"client" | "freelancer" | null>(null);
  const [freelancerVote, setFreelancerVote] = useState<"client" | "freelancer" | null>(null);
  const [adminResolution, setAdminResolution] = useState<{ client: number; freelancer: number } | null>(null);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-destructive/20 text-destructive";
      case "RESOLVED":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-muted/20 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/dashboard/arbitrator">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Disputes
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Dispute Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Status */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold text-foreground">Dispute #{mockDispute.id}</h1>
                  <p className="text-muted-foreground">Job: {mockDispute.jobTitle}</p>
                </div>
                <Badge className={getStatusColor(mockDispute.status)}>
                  {mockDispute.status}
                </Badge>
              </div>
            </div>

            {/* Dispute Info */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Dispute Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Opened</p>
                    <p className="font-semibold text-foreground">{formatDate(mockDispute.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-semibold text-foreground">{formatDate(mockDispute.deadline)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Milestone Amount</p>
                  <p className="font-semibold text-foreground">${mockDispute.milestoneAmount}</p>
                </div>
              </CardContent>
            </Card>

            {/* Reason */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Dispute Reason</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{mockDispute.reason}</p>
                </div>
              </CardContent>
            </Card>

            {/* Client Evidence */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Client Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDispute.clientEvidence.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">IPFS: {file.hash}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Freelancer Evidence */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Freelancer Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockDispute.freelancerEvidence.length > 0 ? (
                  mockDispute.freelancerEvidence.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-semibold text-foreground">{file.name}</p>
                          <p className="text-sm text-muted-foreground">IPFS: {file.hash}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground">No evidence submitted by freelancer</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Parties & Resolution */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle className="text-base">Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{mockDispute.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-mono text-sm text-foreground break-all">{mockDispute.clientAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Freelancer Info */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle className="text-base">Freelancer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{mockDispute.freelancerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-mono text-sm text-foreground break-all">{mockDispute.freelancerAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Resolution */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle className="text-base">Resolution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Client %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={adminResolution?.client || 0}
                    onChange={(e) =>
                      setAdminResolution({
                        client: parseInt(e.target.value),
                        freelancer: 100 - parseInt(e.target.value),
                      })
                    }
                    className="input-base w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Freelancer %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={adminResolution?.freelancer || 0}
                    disabled
                    className="input-base w-full opacity-50"
                  />
                </div>
                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground">
                    Client: ${(parseInt(mockDispute.milestoneAmount) * (adminResolution?.client || 0) / 100).toFixed(2)}
                  </p>
                  <p className="text-sm text-foreground">
                    Freelancer: ${(parseInt(mockDispute.milestoneAmount) * (adminResolution?.freelancer || 0) / 100).toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={() => console.log("Resolving dispute:", adminResolution)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Resolve Dispute
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
