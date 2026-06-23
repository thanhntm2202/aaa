import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Download, FileText, Clock, DollarSign, Users } from "lucide-react";
import { Link } from "wouter";

// Mock job detail
const mockJob = {
  id: 1,
  title: "Smart Contract Audit for DeFi Protocol",
  description: "Need experienced Solidity developer to audit our DeFi smart contracts for security vulnerabilities. Must have experience with OpenZeppelin contracts and common vulnerability patterns.",
  budget: "5000",
  deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  skills: ["Solidity", "Smart Contracts", "Security"],
  status: "OPEN" as const,
  clientName: "TechCorp",
  clientAddress: "0x1234...5678",
  clientRating: 4.8,
  bidsCount: 12,
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  specificationHash: "QmXxxx...",
  milestones: [
    { name: "Initial Audit", percentage: 40, dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
    { name: "Report & Recommendations", percentage: 40, dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000) },
    { name: "Follow-up Review", percentage: 20, dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  ],
};

export default function JobDetail() {
  const { id } = useParams();
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposal, setProposal] = useState({
    introduction: "",
    timeline: "",
    quote: "",
  });

  const handleSubmitProposal = () => {
    console.log("Submitting proposal:", proposal);
    // TODO: Call tRPC procedure to submit proposal
    setShowProposalForm(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4 flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Status */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold text-foreground">{mockJob.title}</h1>
                  <p className="text-muted-foreground">Posted {formatDate(mockJob.createdAt)}</p>
                </div>
                <StatusBadge status={mockJob.status} />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="card-base">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Budget</p>
                    <p className="text-lg font-bold text-foreground">${mockJob.budget}</p>
                  </div>
                </div>
              </Card>
              <Card className="card-base">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Deadline</p>
                    <p className="text-lg font-bold text-foreground">{formatDate(mockJob.deadline)}</p>
                  </div>
                </div>
              </Card>
              <Card className="card-base">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Proposals</p>
                    <p className="text-lg font-bold text-foreground">{mockJob.bidsCount}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Description */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{mockJob.description}</p>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Skills Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockJob.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/20 text-primary border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Milestones */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockJob.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{milestone.name}</p>
                      <p className="text-sm text-muted-foreground">Due: {formatDate(milestone.dueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{milestone.percentage}%</p>
                      <p className="text-sm text-muted-foreground">${(parseInt(mockJob.budget) * milestone.percentage / 100).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Specification File */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Specification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-semibold text-foreground">specification.pdf</p>
                      <p className="text-sm text-muted-foreground">IPFS: {mockJob.specificationHash}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Client Info & CTA */}
          <div className="space-y-6">
            {/* Client Card */}
            <Card className="card-base">
              <CardHeader>
                <CardTitle>Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-semibold text-foreground">{mockJob.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wallet Address</p>
                  <p className="font-mono text-sm text-foreground break-all">{mockJob.clientAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">⭐ {mockJob.clientRating} / 5.0</p>
                </div>
              </CardContent>
            </Card>

            {/* CTA Button */}
            <Button
              onClick={() => setShowProposalForm(!showProposalForm)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
            >
              {showProposalForm ? "Cancel" : "Submit Proposal"}
            </Button>

            {/* Proposal Form */}
            {showProposalForm && (
              <Card className="card-base">
                <CardHeader>
                  <CardTitle>Submit Your Proposal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground">Introduction</label>
                    <textarea
                      value={proposal.introduction}
                      onChange={(e) => setProposal({ ...proposal, introduction: e.target.value })}
                      placeholder="Tell the client about yourself and why you're a good fit..."
                      className="input-base w-full mt-2 h-24 resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Timeline</label>
                    <input
                      type="text"
                      value={proposal.timeline}
                      onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
                      placeholder="e.g., 2 weeks"
                      className="input-base w-full mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground">Your Quote (ETH)</label>
                    <input
                      type="number"
                      value={proposal.quote}
                      onChange={(e) => setProposal({ ...proposal, quote: e.target.value })}
                      placeholder={mockJob.budget}
                      className="input-base w-full mt-2"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitProposal}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Submit Proposal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
