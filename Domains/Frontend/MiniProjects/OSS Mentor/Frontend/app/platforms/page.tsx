"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ExternalLink, Star, GitFork, Users, TrendingUp, Filter } from "lucide-react"
import Link from "next/link"

const platforms = [
  {
    name: "GitHub",
    description: "The world's largest code hosting platform with millions of open source projects",
    url: "https://github.com",
    logo: "GH",
    color: "from-slate-600 to-slate-800",
    stats: { repos: "100M+", users: "100M+", stars: "Billions" },
    pros: ["Largest community", "Excellent CI/CD", "Great documentation", "Free for public repos"],
    bestFor: "All types of projects",
    difficulty: "Beginner-friendly",
  },
  {
    name: "GitLab",
    description: "Complete DevOps platform with built-in CI/CD and project management",
    url: "https://gitlab.com",
    logo: "GL",
    color: "from-orange-600 to-red-600",
    stats: { repos: "10M+", users: "30M+", stars: "Millions" },
    pros: ["Built-in CI/CD", "Self-hosting option", "Integrated DevOps", "Free private repos"],
    bestFor: "Enterprise & DevOps",
    difficulty: "Intermediate",
  },
  {
    name: "Bitbucket",
    description: "Git solution for professional teams with Jira integration",
    url: "https://bitbucket.org",
    logo: "BB",
    color: "from-blue-600 to-blue-800",
    stats: { repos: "5M+", users: "10M+", stars: "Millions" },
    pros: ["Jira integration", "Free private repos", "Pull request reviews", "Team collaboration"],
    bestFor: "Professional teams",
    difficulty: "Intermediate",
  },
  {
    name: "SourceForge",
    description: "One of the oldest open source project hosting platforms",
    url: "https://sourceforge.net",
    logo: "SF",
    color: "from-green-600 to-emerald-700",
    stats: { repos: "500K+", users: "3M+", stars: "Millions" },
    pros: ["Long history", "Download statistics", "Project analytics", "Free hosting"],
    bestFor: "Mature projects",
    difficulty: "Beginner-friendly",
  },
  {
    name: "Codeberg",
    description: "Non-profit, community-driven Git hosting for free and open source software",
    url: "https://codeberg.org",
    logo: "CB",
    color: "from-blue-500 to-cyan-600",
    stats: { repos: "100K+", users: "50K+", stars: "Growing" },
    pros: ["Non-profit", "Privacy-focused", "No tracking", "Community-driven"],
    bestFor: "Privacy-conscious developers",
    difficulty: "Beginner-friendly",
  },
  {
    name: "OpenCollective",
    description: "Transparent funding platform for open source projects and communities",
    url: "https://opencollective.com",
    logo: "OC",
    color: "from-purple-600 to-pink-600",
    stats: { repos: "10K+", users: "500K+", stars: "N/A" },
    pros: ["Transparent funding", "Financial management", "Sponsor matching", "Community support"],
    bestFor: "Funded projects",
    difficulty: "Beginner-friendly",
  },
]

const featuredProjects = [
  {
    name: "First Contributions",
    description: "A hands-on tutorial that walks you through making your first contribution",
    tags: ["Beginner", "Tutorial"],
    stars: "40K+",
    language: "Multiple",
  },
  {
    name: "Good First Issue",
    description: "Curated list of beginner-friendly issues across popular projects",
    tags: ["Beginner", "Curated"],
    stars: "5K+",
    language: "Multiple",
  },
  {
    name: "Awesome for Beginners",
    description: "List of projects with good issues for new contributors",
    tags: ["Beginner", "List"],
    stars: "60K+",
    language: "Multiple",
  },
  {
    name: "Up For Grabs",
    description: "Projects with tasks specifically for new contributors",
    tags: ["Beginner", "Tasks"],
    stars: "N/A",
    language: "Multiple",
  },
]

export default function PlatformsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredPlatforms = platforms.filter((platform) => {
    const matchesSearch =
      platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      platform.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = !selectedDifficulty || platform.difficulty === selectedDifficulty
    return matchesSearch && matchesDifficulty
  })

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Discover Opportunities</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              Open Source{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Platforms
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Explore the best platforms for hosting, discovering, and contributing to open source projects. Find the
              perfect community for your skills and interests.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={selectedDifficulty === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(null)}
              >
                <Filter className="h-4 w-4 mr-2" />
                All
              </Button>
              <Button
                variant={selectedDifficulty === "Beginner-friendly" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("Beginner-friendly")}
              >
                Beginner
              </Button>
              <Button
                variant={selectedDifficulty === "Intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty("Intermediate")}
              >
                Advanced
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border hover:border-primary/50 transition-smooth"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center font-bold text-white text-lg group-hover:scale-110 transition-smooth`}
                  >
                    {platform.logo}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {platform.difficulty}
                  </Badge>
                </div>

                <CardTitle className="text-xl">{platform.name}</CardTitle>
                <CardDescription className="line-clamp-2">{platform.description}</CardDescription>
              </CardHeader>

              <CardContent className="relative space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-border">
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">{platform.stats.repos}</div>
                    <div className="text-xs text-muted-foreground">Repos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">{platform.stats.users}</div>
                    <div className="text-xs text-muted-foreground">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">{platform.stats.stars}</div>
                    <div className="text-xs text-muted-foreground">Stars</div>
                  </div>
                </div>

                {/* Pros */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {platform.pros.slice(0, 3).map((pro, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {pro}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Best For */}
                <div className="pt-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Best for:</span> {platform.bestFor}
                  </p>
                </div>

                {/* CTA */}
                <Button className="w-full group-hover:neon-glow transition-smooth" asChild>
                  <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                    Visit Platform
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlatforms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No platforms found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Featured Projects for Beginners */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beginner-Friendly Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Start your open source journey with these curated projects designed for first-time contributors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="hover:border-primary/50 transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>{project.stars}</span>
                    </div>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{project.language}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Tips */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Tips for Choosing a Platform</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Users,
                title: "Community Size",
                description: "Larger communities offer more projects and learning opportunities",
              },
              {
                icon: GitFork,
                title: "Project Diversity",
                description: "Look for platforms with projects matching your interests and skills",
              },
              {
                icon: Star,
                title: "Documentation",
                description: "Good documentation makes it easier to get started and contribute",
              },
              {
                icon: TrendingUp,
                title: "Active Maintenance",
                description: "Choose platforms with active maintainers who review contributions",
              },
            ].map((tip, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-xl border border-border bg-card">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <tip.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 neon-glow">
          <h2 className="text-3xl md:text-4xl font-bold">Need Help Finding the Right Project?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Use our RepoHelp tool to analyze any repository and get personalized contribution guidance
          </p>
          <Button size="lg" className="neon-glow" asChild>
            <Link href="/repo-help">Try RepoHelp Tool</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
