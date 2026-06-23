import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/JobCard";
import { useWeb3 } from "@/hooks/useWeb3";
import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Users, TrendingUp, CheckCircle, Github, Twitter, Linkedin } from "lucide-react";

// Mock featured jobs
const featuredJobs = [
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
];

const stats = [
  { label: "Active Jobs", value: "2,547" },
  { label: "Freelancers", value: "8,932" },
  { label: "Total Earnings", value: "$4.2M+" },
  { label: "Success Rate", value: "98.5%" },
];

const howItWorks = [
  {
    step: 1,
    title: "Post a Job",
    description: "Clients create detailed job postings with requirements, budget, and deadline.",
    icon: "📝",
  },
  {
    step: 2,
    title: "Receive Bids",
    description: "Freelancers review jobs and submit competitive bids with their proposals.",
    icon: "💼",
  },
  {
    step: 3,
    title: "Secure Payment",
    description: "Funds are locked in escrow, ensuring both parties are protected.",
    icon: "🔒",
  },
  {
    step: 4,
    title: "Complete & Release",
    description: "Freelancer delivers work, client approves, and payment is released automatically.",
    icon: "✅",
  },
];

export default function Landing() {
  const { isConnected, connectWallet, connectors } = useWeb3();

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="font-bold text-lg">FAPEX</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/jobs">
              <a className="text-sm hover:text-primary transition-colors">Browse Jobs</a>
            </Link>
            <Link href="/how-it-works">
              <a className="text-sm hover:text-primary transition-colors">How It Works</a>
            </Link>
            <Link href="/about">
              <a className="text-sm hover:text-primary transition-colors">About</a>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!isConnected ? (
              <Button
                onClick={() => connectWallet()}
                className="bg-primary hover:bg-primary/90"
              >
                Connect Wallet
              </Button>
            ) : (
              <>
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slideInLeft">
            <Badge className="w-fit bg-primary/20 text-primary border-primary/30">
              🚀 Decentralized Freelance Marketplace
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight gradient-text">
              Work Redefined with Blockchain
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              FAPEX is the first decentralized freelance marketplace powered by blockchain technology. Secure payments, transparent contracts, and global opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/jobs">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Browse Jobs <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Join 8,932+ freelancers earning on FAPEX
              </p>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative h-96 md:h-full min-h-96 animate-slideInRight">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-3xl" />
            <div className="relative h-full bg-gradient-accent rounded-2xl border border-primary/20 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Zap className="w-16 h-16 text-primary mx-auto animate-pulse" />
                <p className="text-muted-foreground">Blockchain-Secured Freelancing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container py-16 border-y border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-2 animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
              <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container py-20">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <Badge className="mx-auto bg-primary/20 text-primary border-primary/30">
              Featured Opportunities
            </Badge>
            <h2 className="text-4xl font-bold">Popular Jobs This Week</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover high-paying opportunities from verified clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link href="/jobs">
              <Button size="lg" variant="outline">
                View All Jobs <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-20 border-y border-border/50">
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <Badge className="mx-auto bg-accent/20 text-accent border-accent/30">
              Getting Started
            </Badge>
            <h2 className="text-4xl font-bold">How FAPEX Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and secure from start to finish
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Card className="relative hover-lift">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-4xl">{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-2">Step {item.step}</div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover-lift">
            <CardContent className="p-6 space-y-4">
              <Shield className="w-10 h-10 text-primary" />
              <h3 className="font-bold text-lg">Secure Escrow</h3>
              <p className="text-sm text-muted-foreground">
                Funds are locked in smart contracts, protecting both clients and freelancers
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 space-y-4">
              <Users className="w-10 h-10 text-accent" />
              <h3 className="font-bold text-lg">Global Community</h3>
              <p className="text-sm text-muted-foreground">
                Work with talented professionals from around the world
              </p>
            </CardContent>
          </Card>

          <Card className="hover-lift">
            <CardContent className="p-6 space-y-4">
              <TrendingUp className="w-10 h-10 text-secondary" />
              <h3 className="font-bold text-lg">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees, blockchain-verified transactions
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-gradient-accent rounded-2xl border border-primary/20 p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of freelancers and clients building the future of work on blockchain
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Connect Wallet & Sign In
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/50 backdrop-blur-md mt-20">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="font-bold">FAPEX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Decentralized freelance marketplace powered by blockchain
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/jobs"><a className="hover:text-primary transition-colors">Browse Jobs</a></Link></li>
                <li><Link href="/how-it-works"><a className="hover:text-primary transition-colors">How It Works</a></Link></li>
                <li><Link href="/pricing"><a className="hover:text-primary transition-colors">Pricing</a></Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-primary transition-colors">About</a></Link></li>
                <li><Link href="/blog"><a className="hover:text-primary transition-colors">Blog</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-primary transition-colors">Contact</a></Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2026 FAPEX. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
