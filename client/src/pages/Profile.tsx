import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { useWeb3 } from "@/hooks/useWeb3";
import { useAuth } from "@/_core/hooks/useAuth";
import { Star, MapPin, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Mock user data
const mockUser = {
  id: 1,
  name: "Alex Johnson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  role: "freelancer",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE",
  reputation: 4.8,
  completedJobs: 24,
  totalEarnings: "45,250",
  bio: "Full-stack blockchain developer with 5+ years of experience in Solidity and Web3 technologies.",
  location: "San Francisco, USA",
  skills: ["Solidity", "Web3", "React", "TypeScript", "Smart Contracts", "DeFi"],
  joinedDate: "2023-01-15",
  responseTime: "< 2 hours",
  successRate: "98.5%",
  reviews: [
    {
      id: 1,
      author: "Client 1",
      rating: 5,
      comment: "Excellent work, delivered on time and exceeded expectations!",
      date: "2024-06-10",
    },
    {
      id: 2,
      author: "Client 2",
      rating: 5,
      comment: "Professional and knowledgeable. Highly recommended!",
      date: "2024-05-28",
    },
  ],
  jobHistory: [
    {
      id: 1,
      title: "Smart Contract Audit",
      budget: "5000",
      status: "COMPLETED",
      date: "2024-06-10",
    },
    {
      id: 2,
      title: "Web3 Frontend Development",
      budget: "3500",
      status: "COMPLETED",
      date: "2024-05-28",
    },
  ],
};

export default function Profile() {
  const { address, isConnected } = useWeb3();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    location: mockUser.location,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
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
            <Link href="/jobs">
              <Button variant="outline" size="sm">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {mockUser.location}
                    </p>
                  </div>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => setIsEditing(false)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-bold text-lg">{mockUser.reputation}</span>
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed Jobs</p>
                    <p className="font-bold text-lg mt-1">{mockUser.completedJobs}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="font-bold text-lg text-accent mt-1">${mockUser.totalEarnings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-bold text-lg text-green-500 mt-1">{mockUser.successRate}</p>
                  </div>
                </div>

                {/* Bio */}
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-card border border-border/50 text-sm"
                    rows={3}
                  />
                ) : (
                  <p className="text-muted-foreground">{mockUser.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Connection */}
        {isConnected && address && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Connected Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ethereum Address</p>
                  <p className="font-mono text-sm">{address}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(address)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="history">Job History</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skills.map((skill) => (
                    <Badge key={skill} className="bg-primary/20 text-primary border-primary/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-4">
              {mockUser.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "fill-accent text-accent"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Job History Tab */}
          <TabsContent value="history">
            <div className="space-y-4">
              {mockUser.jobHistory.map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{job.title}</p>
                        <p className="text-sm text-muted-foreground">{job.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-accent">${job.budget}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
