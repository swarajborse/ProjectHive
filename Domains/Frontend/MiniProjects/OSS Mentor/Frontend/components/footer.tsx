import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-gradient-to-br from-card to-muted/30 mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Enhanced Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center font-mono font-bold text-primary-foreground neon-glow">
                <span className="text-sm">OSS</span>
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  OSS Mentor AI
                </span>
                <div className="text-xs text-muted-foreground">Open Source Made Simple</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered guidance for open source contribution and mentorship. Join millions of developers building the future.
            </p>
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Active Community</span>
              <Button className="ml-4 btn-gradient px-3 py-1 text-xs">Join Community</Button>
            </div>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-6 text-foreground">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  About OSS Mentor
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-6 text-foreground">Learning Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/git-github" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  🎓 Git & GitHub Guide
                </Link>
              </li>
              <li>
                <Link href="/platforms" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  🌐 Platform Explorer
                </Link>
              </li>
              <li>
                <Link href="/repo-help" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  🔧 RepoHelp Tool
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="text-muted-foreground hover:text-primary transition-bounce hover:translate-x-1 inline-block">
                  🤖 AI Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Enhanced Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-6 text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get the latest open source trends, tutorials, and opportunities delivered to your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors" 
                />
                <Button size="sm" className="neon-glow px-3 btn-gradient">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                🔒 We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 OSS Mentor AI. Built with ❤️ for the open source community.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-muted-foreground mr-2">Follow us:</div>
            <Link 
              href="https://github.com" 
              className="p-2 rounded-full bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-bounce hover:scale-110"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </Link>
            <Link 
              href="https://twitter.com" 
              className="p-2 rounded-full bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-bounce hover:scale-110"
              title="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link 
              href="https://linkedin.com" 
              className="p-2 rounded-full bg-muted/30 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-bounce hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
