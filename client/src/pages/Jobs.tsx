import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { JobCard } from "@/components/JobCard";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Search, Filter, ChevronDown } from "lucide-react";
import { trpc } from "@/lib/trpc";

// Mock jobs data
const mockJobs = [
  {
    id: 1,
    title: "Smart Contract Audit for DeFi Protocol",
    description: "Need experienced Solidity developer to audit our DeFi smart contracts for security vulnerabilities.",
    budget: "5000",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    skills: ["Solidity", "Smart Contracts", "Security"],
    status: "OPEN" as const,
    clientName: "TechCorp",
    bidsCount: 12,
  },
  {
    id: 2,
    title: "Web3 React Frontend Developer",
    description: "Build a modern React frontend for our blockchain application with wagmi integration.",
    budget: "3500",
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    skills: ["React", "Web3", "TypeScript"],
    status: "OPEN" as const,
    clientName: "StartupXYZ",
    bidsCount: 8,
  },
  {
    id: 3,
    title: "NFT Marketplace Smart Contracts",
    description: "Develop NFT marketplace contracts with royalty support and advanced features.",
    budget: "7500",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    skills: ["Solidity", "NFT", "ERC721"],
    status: "OPEN" as const,
    clientName: "NFTStudio",
    bidsCount: 15,
  },
  {
    id: 4,
    title: "Blockchain Game Development",
    description: "Create a blockchain-based game with NFT integration and play-to-earn mechanics.",
    budget: "8000",
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    skills: ["Game Development", "Blockchain", "Unity"],
    status: "OPEN" as const,
    clientName: "GameStudio",
    bidsCount: 20,
  },
  {
    id: 5,
    title: "API Integration for Web3 Wallet",
    description: "Integrate multiple blockchain networks into our Web3 wallet application.",
    budget: "4500",
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    skills: ["API", "Web3", "Node.js"],
    status: "OPEN" as const,
    clientName: "WalletApp",
    bidsCount: 10,
  },
  {
    id: 6,
    title: "DeFi Protocol Documentation",
    description: "Write comprehensive technical documentation for our DeFi protocol.",
    budget: "2000",
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    skills: ["Technical Writing", "DeFi", "Documentation"],
    status: "OPEN" as const,
    clientName: "DeFiLabs",
    bidsCount: 5,
  },
];

const skillOptions = [
  "Solidity",
  "React",
  "Web3",
  "Smart Contracts",
  "TypeScript",
  "Node.js",
  "NFT",
  "DeFi",
  "Security",
  "Game Development",
];

const budgetRanges = [
  { label: "Under $1,000", min: 0, max: 1000 },
  { label: "$1,000 - $5,000", min: 1000, max: 5000 },
  { label: "$5,000 - $10,000", min: 5000, max: 10000 },
  { label: "$10,000+", min: 10000, max: Infinity },
];

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<{ min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "budget" | "deadline">("newest");

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = mockJobs;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
      );
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter((job) =>
        selectedSkills.some((skill) => job.skills.includes(skill))
      );
    }

    // Budget filter
    if (selectedBudget) {
      filtered = filtered.filter((job) => {
        const budget = parseInt(job.budget);
        return budget >= selectedBudget.min && budget <= selectedBudget.max;
      });
    }

    // Sort
    if (sortBy === "budget") {
      filtered.sort((a, b) => parseInt(b.budget) - parseInt(a.budget));
    } else if (sortBy === "deadline") {
      filtered.sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    }

    return filtered;
  }, [searchQuery, selectedSkills, selectedBudget, sortBy]);

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
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" size="sm">
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, skills, or description..."
              className="pl-10 h-12 bg-card border-border/50 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3 items-center">
            <Filter className="w-5 h-5 text-muted-foreground" />

            {/* Skills Filter */}
            <div className="flex flex-wrap gap-2">
              {skillOptions.slice(0, 5).map((skill) => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedSkills((prev) =>
                      prev.includes(skill)
                        ? prev.filter((s) => s !== skill)
                        : [...prev, skill]
                    )
                  }
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Budget Filter */}
            <div className="flex gap-2">
              {budgetRanges.map((range) => (
                <Badge
                  key={range.label}
                  variant={
                    selectedBudget?.min === range.min && selectedBudget?.max === range.max
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedBudget(
                      selectedBudget?.min === range.min && selectedBudget?.max === range.max
                        ? null
                        : { min: range.min, max: range.max }
                    )
                  }
                >
                  {range.label}
                </Badge>
              ))}
            </div>

            {/* Sort */}
            <div className="ml-auto flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-card border border-border/50 text-sm focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest First</option>
                <option value="budget">Highest Budget</option>
                <option value="deadline">Earliest Deadline</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedSkills.length > 0 || selectedBudget) && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    setSelectedSkills((prev) => prev.filter((s) => s !== skill))
                  }
                >
                  {skill} ✕
                </Badge>
              ))}
              {selectedBudget && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedBudget(null)}
                >
                  Budget: ${selectedBudget.min} - ${selectedBudget.max === Infinity ? "∞" : selectedBudget.max} ✕
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
            </h2>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">No jobs found matching your criteria</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSkills([]);
                  setSelectedBudget(null);
                }}
              >
                Clear Filters
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
