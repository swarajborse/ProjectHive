import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, GitBranch, Users, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Enhanced Hero Section */}
      <section className="relative gradient-bg grid-pattern min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4 glass-morphism">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Welcome to the Future of Open Source</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Discover the Power of{" "}
              <span className="text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Open Source
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Your complete platform to learn, explore, and contribute to open source projects. Get AI-powered guidance,
              interactive tutorials, and powerful tools to start your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button size="lg" className="neon-glow btn-gradient group px-8 py-4 text-lg" asChild>
                <Link href="/open-source">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-bounce" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-morphism px-8 py-4 text-lg hover:scale-105 transition-bounce" asChild>
                <Link href="/git-github">Learn Git & GitHub</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>Community Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Contribute</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools and resources designed to make open source contribution accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Code2,
              title: "Interactive Tutorials",
              description: "Learn Git and GitHub with hands-on, visual guides and real-world examples",
              href: "/git-github",
              color: "from-blue-500/20 to-blue-600/20",
              iconBg: "bg-blue-500/10",
              iconColor: "text-blue-600",
            },
            {
              icon: GitBranch,
              title: "Repository Helper",
              description: "Analyze any repo and get personalized contribution guidance instantly",
              href: "/repo-help",
              color: "from-green-500/20 to-green-600/20",
              iconBg: "bg-green-500/10",
              iconColor: "text-green-600",
            },
            {
              icon: Users,
              title: "Platform Explorer",
              description: "Discover the best open source platforms and find projects that match your skills",
              href: "/platforms",
              color: "from-purple-500/20 to-purple-600/20",
              iconBg: "bg-purple-500/10",
              iconColor: "text-purple-600",
            },
            {
              icon: Sparkles,
              title: "AI Assistant",
              description: "Get real-time help with Git commands, PR reviews, and contribution workflows",
              href: "/chatbot",
              color: "from-orange-500/20 to-orange-600/20",
              iconBg: "bg-orange-500/10",
              iconColor: "text-orange-600",
            },
          ].map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-smooth card-hover glass-morphism"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-smooth`} />

              <div className="relative space-y-4">
                <div className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-bounce`}>
                  <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
                </div>

                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

                <div className="flex items-center text-primary text-sm font-medium pt-2">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-bounce" />
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-3xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-smooth" />
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 border-y border-border bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by the Community</h2>
            <p className="text-muted-foreground">Join millions of developers making their mark in open source</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                value: "10M+", 
                label: "Open Source Projects",
                icon: "🚀",
                description: "Projects waiting for your contribution"
              },
              { 
                value: "50M+", 
                label: "Active Contributors",
                icon: "👥",
                description: "Developers building the future"
              },
              { 
                value: "100+", 
                label: "Supported Platforms",
                icon: "🌐",
                description: "Platforms integrated and ready"
              },
              { 
                value: "24/7", 
                label: "AI Assistance",
                icon: "🤖",
                description: "Always here to help you succeed"
              },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-3 group">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-bounce">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-foreground font-medium">{stat.label}</div>
                <div className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 glass-morphism relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Start Your Journey Today</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Make Your{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                First Contribution?
              </span>
            </h2>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              Join millions of developers contributing to open source. Start learning today with our interactive guides
              and AI-powered tools that make contribution simple and rewarding.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="neon-glow btn-gradient px-8 py-4 text-lg" asChild>
                <Link href="/open-source">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-morphism px-8 py-4 text-lg" asChild>
                <Link href="/repo-help">
                  Try Repository Helper
                </Link>
              </Button>
            </div>

            {/* Feature highlights */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Start in seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
