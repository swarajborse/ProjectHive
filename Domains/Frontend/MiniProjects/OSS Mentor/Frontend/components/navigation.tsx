"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Open Source", href: "/open-source" },
  { name: "Git & GitHub", href: "/git-github" },
  { name: "ChatBot Help", href: "/chatbot" },
  { name: "Platforms", href: "/platforms" },
  { name: "RepoHelp", href: "/repo-help" },
]

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme, systemTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // The `ThemeProvider` uses the `class` attribute; next-themes will add `class="light"` or `class="dark"`.
    // This effect keeps the UI in sync if theme is undefined (SSR hydration).
    if (!theme) return
  }, [theme])

  const toggleTheme = () => {
    const current = theme === "system" ? systemTheme : theme
    setTheme(current === "dark" ? "light" : "dark")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-md bg-background/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center font-mono font-bold text-primary-foreground transition-bounce group-hover:scale-110 group-hover:rotate-3 neon-glow">
              <span className="text-sm">OSS</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                OSS Mentor AI
              </span>
              <div className="text-xs text-muted-foreground -mt-1">Your Open Source Journey</div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 bg-muted/20 rounded-full p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all relative group",
                    pathname === item.href
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_6px_30px_rgba(2,6,23,0.35)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-background/40"
                  )}
              >
                {item.name}
                {pathname === item.href && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 neon-glow opacity-60" />
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-smooth" />
              </Link>
            ))}
          </div>

          {/* Enhanced Right side actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="transition-bounce hover:scale-110 hover:bg-primary/10 rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" || (theme === "system" && systemTheme === "dark") ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-500" />
              )}
            </Button>

            <Button className="hidden sm:inline-flex neon-glow btn-gradient px-6 hover:scale-105 transition-bounce">
              Get Started
            </Button>

            {/* Enhanced Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden transition-bounce hover:scale-110 rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 rotate-90 transition-all duration-300" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/50 glass-morphism">
            <div className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-bounce relative group",
                    pathname === item.href 
                      ? "bg-gradient-to-r from-primary/20 to-accent/20 text-primary border border-primary/30" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    {pathname === item.href && (
                      <div className="w-2 h-2 rounded-full bg-primary neon-glow" />
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-smooth" />
                </Link>
              ))}
              <div className="pt-4 border-t border-border/50">
                <Button className="w-full neon-glow btn-gradient">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
