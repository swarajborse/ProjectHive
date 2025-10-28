import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Heart, Users, Globe, Code, BookOpen, Trophy, Zap } from "lucide-react"

export default function OpenSourcePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Globe className="h-4 w-4" />
              <span>Join the Global Movement</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Discover the Power of{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Open Source
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Open source is more than code—it's a global community of developers collaborating to build the future.
              Learn how you can be part of this transformative movement.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Three Column Info Blocks */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* What is Open Source */}
          <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

            <CardHeader className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Code className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">What is Open Source?</CardTitle>
              <CardDescription>Understanding the foundation</CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Open source software is code that is publicly accessible—anyone can see, modify, and distribute the code
                as they see fit.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Transparent Development</h4>
                    <p className="text-sm text-muted-foreground">
                      All code changes are visible and can be reviewed by anyone
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Community Driven</h4>
                    <p className="text-sm text-muted-foreground">
                      Projects evolve through collective contributions and feedback
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Licensed Freedom</h4>
                    <p className="text-sm text-muted-foreground">
                      Various licenses define how code can be used and shared
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How it Works */}
          <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

            <CardHeader className="relative">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Users className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-2xl">How it Works</CardTitle>
              <CardDescription>Collaboration in action</CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Open source thrives on collaboration. Contributors from around the world work together to improve
                software through a structured workflow.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Find a Project</h4>
                    <p className="text-sm text-muted-foreground">
                      Discover projects that match your interests and skill level
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Make Changes</h4>
                    <p className="text-sm text-muted-foreground">
                      Fork the repo, create a branch, and implement your improvements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-accent">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Submit & Collaborate</h4>
                    <p className="text-sm text-muted-foreground">
                      Open a pull request and work with maintainers to refine your contribution
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="group relative overflow-hidden border-border hover:border-primary/50 transition-smooth">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

            <CardHeader className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                <Trophy className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-2xl">Why Contribute?</CardTitle>
              <CardDescription>Benefits for your career</CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Contributing to open source offers invaluable benefits that accelerate your growth as a developer and
                professional.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Skill Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn from experienced developers and improve your coding practices
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Network Building</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with developers worldwide and build lasting professional relationships
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Portfolio Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      Showcase real-world contributions that demonstrate your abilities to employers
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Open Source Projects Showcase */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powering the World's Technology</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Open source projects form the backbone of modern software development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Linux", description: "Operating System", users: "Billions" },
              { name: "React", description: "UI Framework", users: "Millions" },
              { name: "Kubernetes", description: "Container Orchestration", users: "Thousands" },
              { name: "VS Code", description: "Code Editor", users: "Millions" },
              { name: "TensorFlow", description: "Machine Learning", users: "Millions" },
              { name: "PostgreSQL", description: "Database", users: "Millions" },
              { name: "Node.js", description: "Runtime Environment", users: "Millions" },
              { name: "Git", description: "Version Control", users: "Billions" },
            ].map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-smooth group"
              >
                <div className="space-y-2">
                  <h3 className="font-bold text-lg group-hover:text-primary transition-smooth">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <p className="text-xs text-primary font-medium">{project.users} of users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Impact of Community</h2>
            <p className="text-muted-foreground text-lg">
              Open source is built on the principle that collaboration creates better software
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Passion-Driven",
                description: "Contributors work on projects they care about, leading to higher quality and innovation",
              },
              {
                icon: Globe,
                title: "Global Reach",
                description:
                  "Diverse perspectives from contributors worldwide create more robust and inclusive software",
              },
              {
                icon: Zap,
                title: "Rapid Innovation",
                description: "Collective intelligence accelerates problem-solving and feature development",
              },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 neon-glow">
          <h2 className="text-3xl md:text-5xl font-bold">Start Your Open Source Journey</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Ready to contribute? Learn the essential tools and workflows with our comprehensive Git & GitHub guide.
          </p>
          <Button size="lg" className="neon-glow" asChild>
            <Link href="/git-github">
              Learn Git & GitHub
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
